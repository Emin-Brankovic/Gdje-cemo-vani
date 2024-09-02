using Gdje_cemo_vani.Data;
using Gdje_cemo_vani.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace Gdje_cemo_vani.Filters
{
	public class HangoutSpot_ValidateQueryParametersAttribute:ActionFilterAttribute
	{
		private readonly GdjeCemoVaniDbContext db;

		public HangoutSpot_ValidateQueryParametersAttribute(GdjeCemoVaniDbContext db)
		{
			this.db = db;
		}

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var category = context.HttpContext.Request.Query["category"];
			var townpart = context.HttpContext.Request.Query["townpart"];

			string categoryString= category.ToString();
			string townpartString= townpart.ToString();

			if (string.IsNullOrWhiteSpace(categoryString) && string.IsNullOrWhiteSpace(townpartString))
			{
				var hangoutspots = db.HangoutSpots
				.Include(hg => hg.TownPart)
				.Include(hg => hg.Category)
				.Select(hg => new HangoutSpotDto
				{
					HangoutSpotId = hg.HangoutSpotId,
					Name = hg.Name,
					TownPart = hg.TownPart.Name,
					TownPartId = hg.TownPartId,
					Category = hg.Category.Name,
					CategoryId=hg.CategoryId

				}).ToList();

				context.HttpContext.Items["hangoutspots"] = hangoutspots;
			}
			else if (!string.IsNullOrWhiteSpace(townpartString) && string.IsNullOrWhiteSpace(categoryString))
			{
				var hangoutspots = db.HangoutSpots
					.Include(hg=>hg.TownPart)
					.Include(hg=>hg.Category)
					.Where(hg => hg.TownPart.Name.ToLower() == townpartString.ToLower())
					.Select(hg => new HangoutSpotDto
					{
						HangoutSpotId = hg.HangoutSpotId,
						Name = hg.Name,
						TownPart = hg.TownPart.Name,
						Category = hg.Category.Name
					})
					.ToList();
				if (hangoutspots.Count == 0)
				{
					context.ModelState.AddModelError("TownPart", "The given town part has no registred hangout spots");
					var problemDetail = new ValidationProblemDetails(context.ModelState)
					{
						Status = StatusCodes.Status404NotFound
					};
					context.Result = new NotFoundObjectResult(problemDetail);
				}
				else
					context.HttpContext.Items["hangoutspots"] = hangoutspots;

			}
			else if (string.IsNullOrWhiteSpace(townpartString) && !string.IsNullOrWhiteSpace(categoryString))
			{
				var hangoutspots = db.HangoutSpots
					.Include(hg => hg.TownPart)
					.Include(hg => hg.Category)
					.Where(hg => hg.Category.Name.ToLower() == categoryString.ToLower())
					.Select(hg => new HangoutSpotDto
					{
						HangoutSpotId = hg.HangoutSpotId,
						Name = hg.Name,
						TownPart = hg.TownPart.Name,
						Category = hg.Category.Name
					})
					.ToList();
				if (hangoutspots.Count == 0)
				{
					context.ModelState.AddModelError("Category", "The given category has no registred hangout spots");
					var problemDetail = new ValidationProblemDetails(context.ModelState)
					{
						Status = StatusCodes.Status404NotFound
					};
					context.Result = new NotFoundObjectResult(problemDetail);
				}
				else
					context.HttpContext.Items["hangoutspots"] = hangoutspots;

			}
			else
			{
				var hangoutspots = db.HangoutSpots
					.Include(hg => hg.TownPart)
					.Include(hg => hg.Category)
					.Where(hg => hg.Category.Name.ToLower() == categoryString.ToLower() && hg.TownPart.Name.ToLower()==townpartString.ToLower())
					.Select(hg => new HangoutSpotDto
					{
						HangoutSpotId = hg.HangoutSpotId,
						Name = hg.Name,
						TownPart = hg.TownPart.Name,
						Category = hg.Category.Name
					})
					.ToList();
				if (hangoutspots.Count == 0)
				{
					context.ModelState.AddModelError("Category & Town part", "The given filters have no registred hangout spots combined");
					var problemDetail = new ValidationProblemDetails(context.ModelState)
					{
						Status = StatusCodes.Status404NotFound
					};
					context.Result = new NotFoundObjectResult(problemDetail);
				}
				else
					context.HttpContext.Items["hangoutspots"] = hangoutspots;
			}

		}
	}
}
