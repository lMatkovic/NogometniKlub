using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models
{
    /// <summary>
    /// Apstraktna klasa koja predstavlja entitet s jedinstvenim identifikatorom.
    /// </summary>
    public abstract class Entitet
    {
        /// <summary>
        /// Jedinstveni identifikator entiteta.
        /// </summary>
        [Key]
        public int? Sifra { get; set; }
    }
}
