using Gdje_cemo_vani.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Gdje_cemo_vani.Filters
{
    public class HangoutSpot_ValidateUpdateHangoutSpotFilterAttribute:ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var hangoutSpotId = context.ActionArguments["id"] as int?;
			var hangoutSpot = context.ActionArguments["hangoutSpotDto"] as HangoutSpotDto;

			if(hangoutSpotId!=hangoutSpot.HangoutSpotId && hangoutSpotId.HasValue && hangoutSpot != null)
			{
				context.ModelState.AddModelError("HangoutSpotId", "HangoutSpotId is not the same as Id");
				var problemDetail = new ValidationProblemDetails(context.ModelState)
				{
					Status = StatusCodes.Status400BadRequest
				};
				context.Result = new BadRequestObjectResult(problemDetail);
			}
		}
	}
}
