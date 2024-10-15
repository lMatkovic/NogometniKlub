using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    public record KlubDTOinsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Naziv,
        [Range(30, 500, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "trajanje obavezno")]
        int? Osnovan,
        [Range(0, 10000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        string? Stadion,
        string? Predsjednik,
        string? Drzava,
        string? liga
        );
    
    
}
