using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Models;

namespace NogometniKlubAPP.Data
{
    public class NogometniKlubContext : DbContext
    {
        public NogometniKlubContext(DbContextOptions<NogometniKlubContext> opcije) : base(opcije) 
        {
            
        }

        public DbSet<Klub> Klub { get; set; }
    }
}
