using Gdje_cemo_vani.Data;
using Microsoft.AspNetCore.Mvc;

namespace Gdje_cemo_vani.Controllers
{
	[Controller]
	[Route("[controller]")]
	public class TownPartController:ControllerBase
	{
		private readonly GdjeCemoVaniDbContext db;

		public TownPartController(GdjeCemoVaniDbContext db)
        {
			this.db = db;
		}

		[HttpGet]
		public IActionResult GetTownParts()
		{
			return Ok(db.TownParts.OrderBy(tp=>tp.Name).ToList());
		}
    }
}
