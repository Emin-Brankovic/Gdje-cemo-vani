using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebAppGdjeCemoVani.Data;
using WebAppGdjeCemoVani.Models;

namespace WebAppGdjeCemoVani.Controllers
{
	public class HangoutSpotsController : Controller
	{
		private readonly IWebApiExecuter webApiExecuter;
		private List<Category>? categories;
		private List<TownPart>? townParts;

		public HangoutSpotsController(IWebApiExecuter webApiExecuter)
        {
			this.webApiExecuter = webApiExecuter;
		}
		public async Task<IActionResult> Index(string name,string Categories, string TownParts)
		{
			categories = await webApiExecuter.InvokeGetCategories<List<Category>>("/Categories");
			townParts = await webApiExecuter.InvokeGetTownParts<List<TownPart>>("/TownPart");

			ViewBag.Categories = new SelectList(categories);
			ViewBag.TownParts = new SelectList(townParts);

			if (string.IsNullOrEmpty(name))
			{
				return View(await webApiExecuter.InvokeGet<List<HangoutSpotDto>>($"/HangoutSpot?category={Categories}&townpart={TownParts}"));
			}
			else
				return View(await webApiExecuter.InvokeGet<List<HangoutSpotDto>>($"/HangoutSpot/{name}"));
		}

		public async Task<IActionResult> CreateHangoutSpot()
		{
			categories = await webApiExecuter.InvokeGetCategories<List<Category>>("/Categories");
			townParts = await webApiExecuter.InvokeGetTownParts<List<TownPart>>("/TownPart");

			ViewBag.Categories = new SelectList(categories, "CategoryId","Name");
			ViewBag.TownParts = new SelectList(townParts, "TownPartId","Name");
			return View();
		}
		//Dovrsiti funkciju kao i takodjer dodati u httclientexecuter klasu metodu za post
		[HttpPost]
		public async Task<IActionResult> CreateHangoutSpot(HangoutSpot hangoutSpot)
		{
			var response = await webApiExecuter.InvokePost<HangoutSpot>("/HangoutSpot/create", hangoutSpot);
			if (response != null)
				return RedirectToAction(nameof(Index));

			return View(hangoutSpot);
		}

		private async void PopulateDropdownLists()
		{
			categories = await webApiExecuter.InvokeGetCategories<List<Category>>("/Categories");
			townParts = await webApiExecuter.InvokeGetTownParts<List<TownPart>>("/TownPart");
		}

	}
}
