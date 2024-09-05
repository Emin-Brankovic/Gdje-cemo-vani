using Gdje_cemo_vani.Data;
using Gdje_cemo_vani.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace Gdje_cemo_vani.Filters
{
	public class HangoutSpot_ValidateHangoutSpotIdFilterAttribute:ActionFilterAttribute
	{
		private readonly GdjeCemoVaniDbContext db;

		public HangoutSpot_ValidateHangoutSpotIdFilterAttribute(GdjeCemoVaniDbContext db)
        {
			this.db = db;
		}

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var id = context.ActionArguments["id"] as int?;

			if (id.HasValue)
			{
				if(id<0)
				{
					context.ModelState.AddModelError("HangoutspotId", "HangoutspotId is invalid");
					var problemDetail = new ValidationProblemDetails(context.ModelState)
					{
						Status=StatusCodes.Status400BadRequest
					};
					context.Result=new BadRequestObjectResult(problemDetail);
				}
				else
				{
					var hangoutSpot = db.HangoutSpots
						.Include(hg => hg.TownPart)
						.Include(hg => hg.Category)
						.Where(hg => hg.HangoutSpotId == id)
						.FirstOrDefault();

					if (hangoutSpot == null) 
					{
						context.ModelState.AddModelError("HangoutspotId", "HangoutspotId does not exist");
						var problemDetail = new ValidationProblemDetails(context.ModelState)
						{
							Status = StatusCodes.Status404NotFound
						};
						context.Result = new NotFoundObjectResult(problemDetail);
					}
					else
					{
						context.HttpContext.Items["hangoutSpot"]= hangoutSpot;
					}
				}
			}
		}
	}
}
