using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
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
