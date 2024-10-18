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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            
                modelBuilder.Entity<Igrac>().HasOne(g => g.Klub);
                modelBuilder.Entity<Trener>().HasOne(g => g.Klub);


        }





    }

}