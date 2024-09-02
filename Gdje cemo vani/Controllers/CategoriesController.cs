using Gdje_cemo_vani.Data;
using Microsoft.AspNetCore.Mvc;

namespace Gdje_cemo_vani.Controllers
{
	[Controller]
	[Route("[controller]")]
	public class CategoriesController:ControllerBase
	{
		private readonly GdjeCemoVaniDbContext db;

		public CategoriesController(GdjeCemoVaniDbContext db)
        {
			this.db = db;
		}

		[HttpGet]
		public IActionResult GetCategories() 
		{ 
			return Ok(db.Categories.ToList());
		}

    }
}
