using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje trenera.
    /// </summary>
    /// <param name="Ime">Ime trenera.Obavezno polje</param>
    /// <param name="Prezime">Prezime trenera.Obavezno polje</param>
    /// <param name="KlubSifra">Klub trenera.Obavezno polje</param>
    /// <param name="Nacionalnost">Nacionalnost trenera.Obavezno polje</param>
    /// <param name="Iskustvo">Iskustvo trenera.Obavezno polje</param>
    public record TrenerDTOinsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        string? Prezime,
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "Klub obavezno")]
        int? KlubSifra,
        string? Nacionalnost,
        string? Iskustvo
        );
    
}
