using System.ComponentModel.DataAnnotations;

namespace WebAppGdjeCemoVani.Models
{
	public class IndexViewModel
	{
		public int HangoutSpotId { get; set; }

		[Required]
		public string? Name { get; set; }

		public string? Category { get; set; }
		public int CategoryId { get; set; }

		public string? TownPart { get; set; }
		public int TownPartId { get; set; }

		public string? To { get; set; }
		public string? Message { get; set; }
		public DateTime? MeetingTime { get; set; }

    }
}
