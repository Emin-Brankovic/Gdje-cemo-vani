using Gdje_cemo_vani.Data;
using Gdje_cemo_vani.DTOs;
using Gdje_cemo_vani.Filters;
using Gdje_cemo_vani.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Collections.Generic;

namespace Gdje_cemo_vani.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class HangoutSpotController : ControllerBase
	{
		private readonly GdjeCemoVaniDbContext db;

		public HangoutSpotController(GdjeCemoVaniDbContext db)
		{
			this.db = db;
		}

		[HttpGet]
		[TypeFilter(typeof(HangoutSpot_ValidateQueryParametersAttribute))]
		public IActionResult GetHangoutSpots(int pageNumber,[FromQuery] string? category = "", [FromQuery] string? townpart="")
		{
			if(pageNumber<1)pageNumber=1;
			var result = HttpContext.Items["hangoutspots"] as List<HangoutSpotDto>;
			var paginatedResult = PaginatedList<HangoutSpotDto>.Create(result, pageNumber, 5);

			return Ok(paginatedResult);
		}

		[HttpGet("get/{id}")]
		[TypeFilter(typeof(HangoutSpot_ValidateHangoutSpotIdFilterAttribute))]
		public IActionResult GetHangoutSpotById(int id)
		{
			var hangoutSpot = HttpContext.Items["hangoutSpot"] as HangoutSpot;
			var hangoutSpotDto=new HangoutSpotDto() 
			{
				HangoutSpotId = hangoutSpot.HangoutSpotId,
				Name = hangoutSpot.Name,
				TownPart = hangoutSpot.TownPart.Name,
				TownPartId = hangoutSpot.TownPartId,
				Category = hangoutSpot.Category.Name,
				CategoryId = hangoutSpot.CategoryId
			};

			return Ok(hangoutSpotDto);
		}

		[HttpGet("{name}")]
		[TypeFilter(typeof(HangoutSpot_ValidateHangoutSpotNameAttribute))]
		public IActionResult GetHangoutSpotByName([FromRoute] string name, [FromRoute] int pageNumber = 1)
		{
			var result = HttpContext.Items["hangoutspot"] as List<HangoutSpotDto>;
			var paginatedResult = PaginatedList<HangoutSpotDto>.Create(result, pageNumber, 5);

			return Ok(paginatedResult);
		}

		[HttpPost]
		[Route("create")]
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

			var categoryId = GetCategoryIdHelper(hangoutSpotDto);
			var townPartId = GetTownPartByIdHelper(hangoutSpotDto);


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

		private int GetCategoryIdHelper(HangoutSpotDto hangoutSpotDto)
		{
			return db.Categories
			.Where(c => c.CategoryId == hangoutSpotDto.CategoryId).Select(c => c.CategoryId).First();
		}
		private int GetTownPartByIdHelper(HangoutSpotDto hangoutSpotDto)
		{
			return db.TownParts.Where(t => t.TownPartId == hangoutSpotDto.TownPartId)
			.Select(t => t.TownPartId).First();
		}
	}
}
