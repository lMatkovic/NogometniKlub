using System.ComponentModel.DataAnnotations.Schema;
namespace NogometniKlubAPP.Models
{
    
    public class Utakmica : Entitet
    {
        public DateTime? Datum { get; set; }
        public string? Lokacija { get; set; }
        public string? Stadion { get; set; }
        
        [ForeignKey("domaci_klub")]
        public required Klub Domaci { get; set;}

        [ForeignKey("gostujuci_klub")]
        public required Klub Gostujuci {get; set;}
    
    }
    
}
