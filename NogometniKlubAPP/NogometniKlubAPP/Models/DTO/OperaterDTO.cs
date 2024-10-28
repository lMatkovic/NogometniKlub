using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO (Data Transfer Object) za operatera.
    /// </summary>
    /// <param name="email">Email operatera.</param>
    /// <param name="password">Lozinka operatera.</param>
    public record OperaterDTO(
       [Required(ErrorMessage = "Email je obavezan.")]
            string? email,
       [Required(ErrorMessage = "Lozinka je obavezna.")]
            string? password);
}
