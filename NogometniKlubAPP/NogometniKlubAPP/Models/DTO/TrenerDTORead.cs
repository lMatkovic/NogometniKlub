namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o polazniku.
    /// </summary>
    /// <param name="Sifra">Jedinstveni identifikator trenera.</param>
    /// <param name="Ime">Ime trenera.</param>
    /// <param name="Prezime">Prezime trenera.</param>
    /// <param name="KlubNaziv">Klub trenera.</param>
    /// <param name="Nacionalnost">Nacionalnost trenera.</param>
    /// <param name="Iskustvo">Iskustvo trenera.</param>
    public record TrenerDTORead(
        int Sifra,
        string Ime,
        string Prezime,
        string? KlubNaziv,
        string Nacionalnost,
        string Iskustvo
        );
    
}
