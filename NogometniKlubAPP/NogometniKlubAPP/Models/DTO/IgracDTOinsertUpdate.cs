using System.ComponentModel.DataAnnotations;

namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o igracu.
    /// </summary>
    /// <param name="Ime">Ime igraca. Obavezno polje</param>
    /// <param name="Prezime">Prezime igraca. Obavezno polje</param>
    /// <param name="KlubSifra">klub igraca. Obavezno polje</param>
    /// <param name="DatumRodjenja">Datum rodjenja igraca.Obavezno polje</param>
    /// <param name="Pozicija">Pozicija igraca.Obavezno polje</param>
    /// <param name="BrojDresa">Broj dresa igraca.Obavezno polje</param>
    
    public record IgracDTOinsertUpdate(
       [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,
        string? Prezime,
        [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "Klub obavezno")]
        int? KlubSifra,
       [Required(ErrorMessage = "Prezime obavezno")]
        DateTime? DatumRodjenja,
        string? Pozicija,
        int? BrojDresa);
    
}

