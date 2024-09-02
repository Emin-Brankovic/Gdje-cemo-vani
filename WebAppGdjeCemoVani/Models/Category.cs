using System.ComponentModel.DataAnnotations;
namespace WebAppGdjeCemoVani.Models
{
	public class Category
	{
        public int CategoryId { get; set; }

        [Required]
        public string Name { get; set; }

		public ICollection<HangoutSpot> HangoutSpots { get; } = new List<HangoutSpot>();

		public override string ToString()
		{
			return Name;
		}
	}
}
