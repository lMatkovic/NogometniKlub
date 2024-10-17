using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    public record IgracDTOinsertUpdate(
       [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,
       [Required(ErrorMessage = "Prezime obavezno")]
        string? Prezime,
       [Required(ErrorMessage = "Email obavezno")]
        [EmailAddress(ErrorMessage ="Email nije dobrog formata")]
        DateTime? datumrodjenja,
        string? pozicija,
        int? brojdresa);
    
}

