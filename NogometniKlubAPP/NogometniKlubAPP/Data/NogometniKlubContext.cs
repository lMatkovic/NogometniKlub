using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Models;

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
    }
}
