using Gdje_cemo_vani.Data;
using Gdje_cemo_vani.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Gdje_cemo_vani.Filters
{
	public class HangoutSpot_ValidateCreateHangoutSpotFilterAttribute:ActionFilterAttribute
	{
		private readonly GdjeCemoVaniDbContext db;

		public HangoutSpot_ValidateCreateHangoutSpotFilterAttribute(GdjeCemoVaniDbContext db)
        {
			this.db = db;
		}
        public override void OnActionExecuting(ActionExecutingContext context)
		{
			var hangoutspot = context.ActionArguments["hangoutSpot"] as HangoutSpot;

			if (hangoutspot == null)
			{
				context.ModelState.AddModelError("Hangout spot", "No Hangout spot object was passed for creation");

				var problemDetail = new ValidationProblemDetails(context.ModelState)
				{
					Status = StatusCodes.Status400BadRequest
				};
				context.Result = new BadRequestObjectResult(problemDetail);
			}
			else
			{
				var searchResult = db.HangoutSpots
				.FirstOrDefault(hg =>
					!string.IsNullOrWhiteSpace(hg.Name) &&
					!string.IsNullOrWhiteSpace(hangoutspot.Name) &&
					hg.Name.ToLower() == hangoutspot.Name.ToLower() &&
					hg.TownPartId == hangoutspot.TownPartId &&
					hg.CategoryId == hangoutspot.CategoryId
					);

				if(searchResult != null )
				{
					context.ModelState.AddModelError("Hangout spot", "Hangout spot already exists");
					var problemDetail = new ValidationProblemDetails(context.ModelState)
					{ Status = StatusCodes.Status400BadRequest };

					context.Result = new BadRequestObjectResult(problemDetail);
				}
			}
		}
	}
}
