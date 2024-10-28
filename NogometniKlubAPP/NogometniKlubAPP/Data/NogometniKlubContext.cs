using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Models;
using System.Text.RegularExpressions;

namespace NogometniKlubAPP.Data
{
    
        public class NogometniKlubContext : DbContext
        {
            public NogometniKlubContext(DbContextOptions<NogometniKlubContext> opcije) : base(opcije)
            {

            }


            public DbSet<Klub> Klubovi { get; set; }
            public DbSet<Igrac> Igraci { get; set; }
            public DbSet<Trener> Treneri { get; set; }
            public DbSet<Utakmica> Utakmice { get; set; }
            public DbSet<Operater> Operateri { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            
                modelBuilder.Entity<Igrac>().HasOne(g => g.Klub);
                modelBuilder.Entity<Trener>().HasOne(g => g.Klub);

            modelBuilder.Entity<Utakmica>()
                 .HasOne(u => u.Domaci)
                .WithMany()
                .HasForeignKey("DomaciSifra");

            modelBuilder.Entity<Utakmica>()
                .HasOne(u => u.Gostujuci)
                .WithMany()
                .HasForeignKey("GostujuciSifra");


        }





    }

}