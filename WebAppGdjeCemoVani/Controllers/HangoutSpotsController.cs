using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq;
using System.Xml.Linq;
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

		[HttpPost]
		public async Task<IActionResult> CreateHangoutSpot(HangoutSpot hangoutSpot)
		{
			var response = await webApiExecuter.InvokePost<HangoutSpot>("/HangoutSpot/create", hangoutSpot);
			if (response != null)
				return RedirectToAction(nameof(Index));

			return View(hangoutSpot);
		}

		public async Task<IActionResult> UpdateHangoutSpot(int hangoutspotId)
		{
			categories = await webApiExecuter.InvokeGetCategories<List<Category>>("/Categories");
			townParts = await webApiExecuter.InvokeGetTownParts<List<TownPart>>("/TownPart");

			ViewBag.Categories = new SelectList(categories, "CategoryId", "Name");
			ViewBag.TownParts = new SelectList(townParts, "TownPartId", "Name");

			var response = await webApiExecuter.InvokeGet<HangoutSpotDto>($"/HangoutSpot/get/{hangoutspotId}");

			return View(response);
		}

		[HttpPost]
		public async Task<IActionResult> UpdateHangoutSpot(HangoutSpotDto hangoutspot)
		{
			if(ModelState.IsValid)
			{
				try
				{
					//var hangoutSpotPut=new HangoutSpot()
					//{
					//	HangoutSpotId=hangoutspot.HangoutSpotId,
					//	Name=hangoutspot.Name,
					//	CategoryId=hangoutspot.CategoryId,
					//	TownPartId=hangoutspot.TownPartId,
						

					//};
					 await webApiExecuter.InvokePut<HangoutSpotDto>($"/HangoutSpot/update/{hangoutspot.HangoutSpotId}", hangoutspot);
					return RedirectToAction(nameof(Index));

				}
				catch (WepApiException ex)
				{
					HandleWebApiException(ex);
				}
			}
			categories = await webApiExecuter.InvokeGetCategories<List<Category>>("/Categories");
			townParts = await webApiExecuter.InvokeGetTownParts<List<TownPart>>("/TownPart");

			ViewBag.Categories = new SelectList(categories, "CategoryId", "Name");
			ViewBag.TownParts = new SelectList(townParts, "TownPartId", "Name");

			return View(hangoutspot);
		}

		private void HandleWebApiException(WepApiException ex)
		{
			if (ex.ErrorResponse != null && ex.ErrorResponse.Errors != null && ex.ErrorResponse.Errors.Count > 0)
			{
				foreach (var error in ex.ErrorResponse.Errors)
				{
					ModelState.AddModelError(error.Key, string.Join(";", error.Value));
				}
			}
		}
	}

}

