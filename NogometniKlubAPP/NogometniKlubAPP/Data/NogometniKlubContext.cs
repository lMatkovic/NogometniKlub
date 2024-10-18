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

            protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // implementacija veze 1:n
                modelBuilder.Entity<Igrac>().HasOne(g => g.Klub);

          
        }





    }

}