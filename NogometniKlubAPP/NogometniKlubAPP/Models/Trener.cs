using System.ComponentModel.DataAnnotations.Schema;

namespace NogometniKlubAPP.Models
{
    
    public class Trener : Entitet
    {

        public string? Ime { get; set; }

        [ForeignKey("klub")]
        public required Klub Klub { get; set; }
        public string? Prezime { get; set; }
        public string? Nacionalnost { get; set; }
        public string? Iskustvo { get; set; }

    }
    
}
