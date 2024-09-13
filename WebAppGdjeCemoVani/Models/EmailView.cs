using System.ComponentModel.DataAnnotations;

namespace WebAppGdjeCemoVani.Models
{
	public class EmailView
	{
		[Required(ErrorMessage ="Reciever is required")]
		[EmailAddress(ErrorMessage = "Please enter a valid email address.")]
		public string? To { get; set; }
		public string? Message { get; set; }
		[Required(ErrorMessage ="Sender is required")]
		public string? From { get; set; }
		public DateTime? MeetingTime { get; set; }
	}
}
