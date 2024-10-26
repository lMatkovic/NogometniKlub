using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    public record KlubDTOinsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Naziv,
        [Range(1857, 2024, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "osnovan obavezno")]
        int? Osnovan,
        string? Stadion,
        string? Predsjednik,
        string? Drzava,
        string? Liga
        );
    
    
}
