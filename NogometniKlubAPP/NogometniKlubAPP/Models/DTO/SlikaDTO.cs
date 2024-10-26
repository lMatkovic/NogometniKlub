using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    public record SlikaDTO([Required(ErrorMessage = "Base64 zapis slike obavezno")] string Base64);
}
