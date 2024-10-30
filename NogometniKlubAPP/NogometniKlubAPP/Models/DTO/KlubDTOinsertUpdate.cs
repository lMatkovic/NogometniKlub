using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za unos i azuriranje kluba.
    /// </summary>
    /// <param name="Naziv">Naziv kluba.</param>
    /// <param name="Osnovan">Kada je klub osnovan.</param>
    /// <param name="Stadion">stadion kluba.</param>
    /// <param name="Predsjednik">Predsjednik kluba.</param>
    /// <param name="Drzava">Drzava kluba.</param>
    /// <param name="Liga">Ligra kluba.</param>
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
