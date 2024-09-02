using System.ComponentModel.DataAnnotations;
namespace Gdje_cemo_vani.Models
{
	public class HangoutSpot
	{
        public int HangoutSpotId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        [Required]
        public int TownPartId { get; set; }

        public TownPart? TownPart { get; set; }


    }
}
