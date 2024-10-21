using System.ComponentModel.DataAnnotations.Schema;
namespace NogometniKlubAPP.Models
{
    
    public class Utakmica : Entitet
    {
        public DateTime? Datum { get; set; }
        public string? Lokacija { get; set; }
        public string? Stadion { get; set; }

        [Column("domaci_klub")]  
        public int DomaciSifra { get; set; }

        [ForeignKey("DomaciSifra")]
        public Klub Domaci { get; set; }

        [Column("gostujuci_klub")]  
        public int GostujuciSifra { get; set; }

        [ForeignKey("GostujuciSifra")]
        public Klub Gostujuci { get; set; }
    }
}
    
    
    

