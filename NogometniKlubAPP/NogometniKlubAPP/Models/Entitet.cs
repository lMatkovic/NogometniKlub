using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models
{
    public abstract class Entitet
    {
        [Key]

        public int? Sifra { get; set; }
    }
}
