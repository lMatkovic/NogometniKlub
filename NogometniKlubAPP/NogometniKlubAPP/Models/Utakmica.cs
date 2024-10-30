using System.ComponentModel.DataAnnotations.Schema;
namespace NogometniKlubAPP.Models
{
    /// <summary>
    /// Predstavlja utakmicu u sustavu.
    /// Nasleđuje klasu <see cref="Entitet"/>.
    /// </summary>
    public class Utakmica : Entitet
    {
        /// <summary>
        /// Datum i vreme odigravanja utakmice.
        /// Može biti null ako datum nije postavljen.
        /// </summary>
        public DateTime? Datum { get; set; }

        /// <summary>
        /// Lokacija na kojoj se utakmica odigrava.
        /// Može biti null ako lokacija nije postavljena.
        /// </summary>
        public string? Lokacija { get; set; }

        /// <summary>
        /// Naziv stadiona gde se utakmica igra.
        /// Može biti null ako stadion nije postavljen.
        /// </summary>
        public string? Stadion { get; set; }

        /// <summary>
        /// Jedinstveni identifikator domaćeg kluba.
        /// </summary>
        [Column("domaci_klub")]  
        public int DomaciSifra { get; set; }

        /// <summary>
        /// Domaći klub koji igra utakmicu.
        /// </summary>
        [ForeignKey("DomaciSifra")]
        public required Klub Domaci { get; set; }

        /// <summary>
        /// Jedinstveni identifikator gostujućeg kluba.
        /// </summary>
        [Column("gostujuci_klub")]  
        public int GostujuciSifra { get; set; }

        /// <summary>
        /// Gostujući klub koji igra utakmicu.
        /// </summary>
        [ForeignKey("GostujuciSifra")]
        public required Klub Gostujuci { get; set; }
    }
}
    
    
    

