namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o igracu.
    /// </summary>
    /// <param name="Sifra">Jedinstveni identifikator igraca.</param>
    /// <param name="Ime">Ime igraca.</param>
    /// <param name="Prezime">Prezime igraca.</param>
    /// <param name="KlubNaziv">klub igraca.</param>
    /// <param name="DatumRodjenja">Datum rodjenja igraca.</param>
    /// <param name="Pozicija">OIB polaznika (opcionalno).</param>
    /// <param name="BrojDresa">Broj dresa igraca.</param>
    /// <param name="Slika">URL slike igraca (opcionalno).</param>
    public record IgracDTORead(
        int? Sifra,
        string Ime,
        string Prezime,
        string? KlubNaziv,
        DateTime? DatumRodjenja,
        string Pozicija,
        int BrojDresa,
        string? Slika
        );
    
}
