using System.ComponentModel.DataAnnotations.Schema;

namespace NogometniKlubAPP.Models
{
    /// <summary>
    /// Klasa koja predstavlja igrace.
    /// </summary>
    public class Igrac : Entitet
    {
        /// <summary>
        /// Ime igraca.
        /// </summary>
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime Igraca.
        /// </summary>
        public string? Prezime { get; set; }

        /// <summary>
        /// Klub igraca.
        /// </summary>
        [ForeignKey("klub")]
        public required Klub Klub { get; set; }

        /// <summary>
        /// Datum rodjenja igraca.
        /// </summary>
        public DateTime? DatumRodjenja { get; set; }

        /// <summary>
        /// Pozicija igraca.
        /// </summary>
        public string? Pozicija { get; set; }

        /// <summary>
        /// Broj dresa igraca.
        /// </summary>
        public int? BrojDresa { get; set; }
       
    }
    
}
