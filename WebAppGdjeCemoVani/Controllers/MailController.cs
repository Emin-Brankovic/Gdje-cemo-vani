using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using WebAppGdjeCemoVani.Data;
using WebAppGdjeCemoVani.Models;

namespace WebAppGdjeCemoVani.Controllers
{
	public class MailController : Controller
	{
		private readonly IWebApiExecuter webApiExecuter;
		private readonly IMailSender emailSender;

		public MailController(IWebApiExecuter webApiExecuter,IMailSender emailSender)
        {
			this.webApiExecuter = webApiExecuter;
			this.emailSender = emailSender;
		}

        public async Task<IActionResult> CreateEmail(int hangoutspotId)
		{
			var response = await webApiExecuter.InvokeGet<HangoutSpotDto>($"/HangoutSpot/get/{hangoutspotId}");

			var mail = new EmailView ()
			{
				To ="",
				MeetingTime = DateTime.Now,
				Message="Selam, do you want to go out\n"+
						$"Where:{response.Name}\n" +
						$"Category:{response.Category}\n" +
						$"Location:{response.TownPart}\n"
			};

			return View(mail);
		}

		[HttpPost]
		public async Task<IActionResult> SendEmail(EmailView email)
		{
			var receiver = email.To;
			var subject = "Vanka?";
			var message = email.Message+$"When:{email.MeetingTime.ToString()}\n"+$"From:{email.From}";

			await emailSender.SendEmailAsync(receiver, subject, message);

			return View();
		}
	}
}
