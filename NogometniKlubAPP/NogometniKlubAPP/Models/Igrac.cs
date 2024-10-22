using System.ComponentModel.DataAnnotations.Schema;

namespace NogometniKlubAPP.Models
{
    
    public class Igrac : Entitet
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }

        [ForeignKey("klub")]
        public required Klub Klub { get; set; }
        public DateTime? DatumRodjenja { get; set; }
        public string? Pozicija { get; set; }
        public int? BrojDresa { get; set; }
       
    }
    
}
