using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebAppGdjeCemoVani.Data;
using WebAppGdjeCemoVani.Models;

namespace WebAppGdjeCemoVani.Controllers
{
	public class HangoutSpotsController : Controller
	{
		private readonly IWebApiExecuter webApiExecuter;

		public HangoutSpotsController(IWebApiExecuter webApiExecuter)
        {
			this.webApiExecuter = webApiExecuter;
		}
		public async Task<IActionResult> Index(string name,string Categories, string TownParts)
		{
			var categories = await webApiExecuter.InvokeGetCategories<List<Category>>("/Categories");
			var townParts = await webApiExecuter.InvokeGetTownParts<List<TownPart>>("/TownPart");

			ViewBag.Categories =new SelectList(categories);
			ViewBag.TownParts = new SelectList(townParts);

			if (string.IsNullOrEmpty(name))
			{
				return View(await webApiExecuter.InvokeGet<List<HangoutSpotDto>>($"/HangoutSpot?category={Categories}&townpart={TownParts}"));
			}
			else
				return View(await webApiExecuter.InvokeGet<List<HangoutSpotDto>>($"/HangoutSpot/{name}"));
		}

		public IActionResult CreateHangoutSpot()
		{
			return View();
		}
		//Dovrsiti funkciju kao i takodjer dodati u httclientexecuter klasu metodu za post
		[HttpPost]
		public IActionResult CreateHangoutSpot(HangoutSpot hangoutSpot)
		{
			return View();
		}
	}
}
