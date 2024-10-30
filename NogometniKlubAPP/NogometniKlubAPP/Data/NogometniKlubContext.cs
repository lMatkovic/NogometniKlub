using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Models;
using System.Text.RegularExpressions;

namespace NogometniKlubAPP.Data
{

    /// <summary>
    /// Kontekst baze podataka za aplikaciju NogometniKlub.
    /// </summary>
    /// <remarks>
    /// Konstruktor koji prima opcije za konfiguraciju konteksta.
    /// </remarks>
    /// <param name="opcije">Opcije za konfiguraciju konteksta.</param>
    public class NogometniKlubContext(DbContextOptions<NogometniKlubContext> opcije) : DbContext(opcije)
        {

        /// <summary>
        /// Skup podataka za entitet Klub.
        /// </summary>
        public DbSet<Klub> Klubovi { get; set; }

        /// <summary>
        /// Skup podataka za entitet Igrac.
        /// </summary>
        public DbSet<Igrac> Igraci { get; set; }

        /// <summary>
        /// Skup podataka za entitet Trener.
        /// </summary>
        public DbSet<Trener> Treneri { get; set; }

        /// <summary>
        /// Skup podataka za entitet Utakmice.
        /// </summary>
        public DbSet<Utakmica> Utakmice { get; set; }

        /// <summary>
        /// Skup podataka za entitet Operater.
        /// </summary>
        public DbSet<Operater> Operateri { get; set; }


        /// <summary>
        /// Konfiguracija modela prilikom kreiranja baze podataka.
        /// </summary>
        /// <param name="modelBuilder">Graditelj modela.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Implementacija veze 1:n
            modelBuilder.Entity<Igrac>().HasOne(g => g.Klub);

            // Implementacija veze 1:n
            modelBuilder.Entity<Trener>().HasOne(g => g.Klub);

            // Implementacija veze 1:n
            modelBuilder.Entity<Utakmica>()
                 .HasOne(u => u.Domaci)
                .WithMany()
                .HasForeignKey("DomaciSifra");

            // Implementacija veze 1:n
            modelBuilder.Entity<Utakmica>()
                .HasOne(u => u.Gostujuci)
                .WithMany()
                .HasForeignKey("GostujuciSifra");


        }





    }

}