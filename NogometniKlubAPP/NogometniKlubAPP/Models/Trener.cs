using System.ComponentModel.DataAnnotations.Schema;

namespace NogometniKlubAPP.Models
{
    /// <summary>
    /// Klasa koja predstavlja Trenera.
    /// </summary>
    public class Trener : Entitet
    {

        /// <summary>
        /// Ime trenera.
        /// </summary>
        public string? Ime { get; set; }

        /// <summary>
        /// Prezime trenera.
        /// </summary>
        public string? Prezime { get; set; }

        /// <summary>
        /// Klub trenera.
        /// </summary>
        [ForeignKey("klub")]
        public required Klub Klub { get; set; }

        /// <summary>
        /// Nacionalnost trenera.
        /// </summary>
        public string? Nacionalnost { get; set; }

        /// <summary>
        /// Iskustvo trenera.
        /// </summary>
        public string? Iskustvo { get; set; }

    }
    
}
