using System.ComponentModel.DataAnnotations;

namespace WebAppGdjeCemoVani
{
    public class HangoutSpotDto
    {
        public int HangoutSpotId { get; set; }

        [Required]
        public string? Name { get; set; }

        public string Category { get; set; }
        public int CategoryId { get; set; }

        public string TownPart { get; set; }
        public int TownPartId { get; set; }

    }
}
