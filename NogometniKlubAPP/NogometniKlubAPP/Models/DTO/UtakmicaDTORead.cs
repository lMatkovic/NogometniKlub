namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o utakmici.
    /// </summary>
    /// <param name="Sifra">Jedinstveni identifikator utakmice.</param>
    /// <param name="Datum">Datum i vreme odigravanja utakmice.</param>
    /// <param name="Lokacija">Lokacija na kojoj se utakmica odigrava.</param>
    /// <param name="Stadion">Naziv stadiona gde se utakmica igra.</param>
    /// <param name="DomaciNaziv">Naziv domaćeg tima koji igra utakmicu.</param>
    /// <param name="GostujuciNaziv">Naziv gostujućeg tima koji igra utakmicu.</param>
    public record UtakmicaDTORead(
        int Sifra,
        DateTime Datum,
        string Lokacija,
        string Stadion,
        string DomaciNaziv,
        string GostujuciNaziv
        );


}
