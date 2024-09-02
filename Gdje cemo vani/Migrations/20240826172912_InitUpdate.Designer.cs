﻿// <auto-generated />
using Gdje_cemo_vani.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Gdje_cemo_vani.Migrations
{
    [DbContext(typeof(GdjeCemoVaniDbContext))]
    [Migration("20240826172912_InitUpdate")]
    partial class InitUpdate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Gdje_cemo_vani.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Gdje_cemo_vani.Models.HangoutSpot", b =>
                {
                    b.Property<int>("HangoutSpotId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HangoutSpotId"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TownPartId")
                        .HasColumnType("int");

                    b.HasKey("HangoutSpotId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("TownPartId");

                    b.ToTable("HangoutSpots");
                });

            modelBuilder.Entity("Gdje_cemo_vani.Models.TownPart", b =>
                {
                    b.Property<int>("TownPartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TownPartId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TownPartId");

                    b.ToTable("TownParts");
                });

            modelBuilder.Entity("Gdje_cemo_vani.Models.HangoutSpot", b =>
                {
                    b.HasOne("Gdje_cemo_vani.Models.Category", "Category")
                        .WithMany("HangoutSpots")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gdje_cemo_vani.Models.TownPart", "TownPart")
                        .WithMany("HangoutSpots")
                        .HasForeignKey("TownPartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("TownPart");
                });

            modelBuilder.Entity("Gdje_cemo_vani.Models.Category", b =>
                {
                    b.Navigation("HangoutSpots");
                });

            modelBuilder.Entity("Gdje_cemo_vani.Models.TownPart", b =>
                {
                    b.Navigation("HangoutSpots");
                });
#pragma warning restore 612, 618
        }
    }
}
