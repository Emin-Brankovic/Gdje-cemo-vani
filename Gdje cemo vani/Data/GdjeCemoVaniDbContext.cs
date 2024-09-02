using Gdje_cemo_vani.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Gdje_cemo_vani.Data
{
	public class GdjeCemoVaniDbContext:DbContext
	{
        public GdjeCemoVaniDbContext(DbContextOptions options):base(options) {}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<TownPart>()
			.HasMany(e => e.HangoutSpots)
			.WithOne(e => e.TownPart)
			.HasForeignKey(e => e.TownPartId)
			.IsRequired(true);

			modelBuilder.Entity<Category>()
			.HasMany(e=>e.HangoutSpots)
			.WithOne(e=>e.Category)
			.HasForeignKey(e=>e.CategoryId)
			.IsRequired(true);
		}

        public DbSet<HangoutSpot> HangoutSpots { get; set; }
        public DbSet<TownPart> TownParts { get; set; }
		public DbSet<Category> Categories { get; set; }
    }
}
