using Gdje_cemo_vani.Data;
using Gdje_cemo_vani.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace Gdje_cemo_vani.Filters
{
	public class HangoutSpot_ValidateHangoutSpotNameAttribute:ActionFilterAttribute
	{
		private readonly GdjeCemoVaniDbContext db;

		public HangoutSpot_ValidateHangoutSpotNameAttribute(GdjeCemoVaniDbContext db)
        {
			this.db = db;
		}

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var hangoutspotName = context.ActionArguments["name"] as string;

			if(string.IsNullOrWhiteSpace(hangoutspotName))
			{
				context.ModelState.AddModelError("Hangout spot name", $"The given name is invalid:{hangoutspotName}");
				var problemDetail = new ValidationProblemDetails(context.ModelState)
				{
					Status = StatusCodes.Status400BadRequest
				};
				context.Result = new BadRequestObjectResult(problemDetail);
			}
			else
			{
				var hangoutSpot = db.HangoutSpots
				.Include(hg => hg.TownPart)
				.Include(hg => hg.Category)
				.Where(hg => hg.Name.ToLower() == hangoutspotName.ToLower())
				.Select(hg => new HangoutSpotDto
				{
					HangoutSpotId = hg.HangoutSpotId,
					Name = hg.Name,
					TownPart = hg.TownPart.Name,
					TownPartId = hg.TownPartId,
					Category = hg.Category.Name,
					CategoryId = hg.CategoryId
				})
				.ToList();

                if(hangoutSpot == null) 
                {
					context.ModelState.AddModelError("Hangout spot name", $"The hangout spot with the given name:({hangoutspotName}) does not exist");
					var problemDetail = new ValidationProblemDetails(context.ModelState)
					{
						Status = StatusCodes.Status404NotFound
					};
					context.Result = new NotFoundObjectResult(problemDetail);
				}
				else
				{
					context.HttpContext.Items["hangoutspot"]=hangoutSpot;
				}
            }
		}
	}
}
