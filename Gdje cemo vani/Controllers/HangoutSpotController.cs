using Gdje_cemo_vani.Data;
using Gdje_cemo_vani.DTOs;
using Gdje_cemo_vani.Filters;
using Gdje_cemo_vani.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace Gdje_cemo_vani.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class HangoutSpotController:ControllerBase
	{
		private readonly GdjeCemoVaniDbContext db;

		public HangoutSpotController(GdjeCemoVaniDbContext db)
        {
			this.db = db;
		}

		[HttpGet]
		[TypeFilter(typeof(HangoutSpot_ValidateQueryParametersAttribute))]
		public IActionResult GetHangoutSpots([FromQuery] string? category = "", [FromQuery] string? townpart="")
		{
			var result = HttpContext.Items["hangoutspots"] as List<HangoutSpotDto>;

			return Ok(result);
		}

		[HttpGet("{name}")]
		[TypeFilter(typeof(HangoutSpot_ValidateHangoutSpotNameAttribute))]
		public IActionResult GetHangoutSpotByName([FromRoute] string name)
		{
			var result = HttpContext.Items["hangoutspot"] as List<HangoutSpotDto>;
			return Ok(result);
		}

		[HttpPost]
		[Route("/create")]
		[TypeFilter(typeof(HangoutSpot_ValidateCreateHangoutSpotFilterAttribute))]
		public IActionResult CreateHangoutSpot([FromBody] HangoutSpot hangoutSpot)
		{
			db.HangoutSpots.Add(hangoutSpot);
			db.SaveChanges();

			return CreatedAtAction(nameof(GetHangoutSpotByName), new {Name=hangoutSpot.Name}, hangoutSpot);
		}

		[HttpPut("update/{id}")]
		[TypeFilter(typeof(HangoutSpot_ValidateHangoutSpotIdFilterAttribute))]
		[HangoutSpot_ValidateUpdateHangoutSpotFilter]
		public IActionResult UpdateShirt([FromBody] HangoutSpotDto hangoutSpotDto,int id)
		{
			var hangoutSpotToUpdate = HttpContext.Items["hangoutSpot"] as HangoutSpot;

			var categoryId = GetTownPartByIdHelper(hangoutSpotDto);
			var townPartId = GetCategoryIdHelper(hangoutSpotDto);


			hangoutSpotToUpdate.TownPartId = hangoutSpotDto.TownPartId;
			hangoutSpotToUpdate.CategoryId = hangoutSpotDto.CategoryId;
			hangoutSpotToUpdate.Name= hangoutSpotDto.Name;

			db.SaveChanges();

			return NoContent();

		}


		[HttpDelete("delete/{id}")]
		[TypeFilter(typeof(HangoutSpot_ValidateHangoutSpotIdFilterAttribute))]
		public IActionResult DeleteHangoutSpot(int id)
		{
			var hangoutSpot = HttpContext.Items["hangoutSpot"] as HangoutSpot;

			db.HangoutSpots.Remove(hangoutSpot);
			db.SaveChanges();

			return Ok(hangoutSpot);
		}

		private int GetTownPartByIdHelper(HangoutSpotDto hangoutSpotDto)
		{
			return db.Categories
			.Where(c => c.Name.ToLower() == hangoutSpotDto.Category.ToLower()).Select(c => c.CategoryId).First();
		}
		private int GetCategoryIdHelper(HangoutSpotDto hangoutSpotDto)
		{
			return db.TownParts.Where(t => t.Name.ToLower() == hangoutSpotDto.TownPart.ToLower())
			.Select(t => t.TownPartId).First();
		}
	}
}
