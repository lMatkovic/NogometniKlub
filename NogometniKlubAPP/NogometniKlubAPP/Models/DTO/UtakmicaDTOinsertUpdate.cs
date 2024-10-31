namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje podataka o utakmici.
    /// </summary>
    /// <param name="Datum">Datum i vrijeme odigravanja utakmice.</param>
    /// <param name="Lokacija">Lokacija na kojoj se utakmica odigrava.</param>
    /// <param name="Stadion">Naziv stadiona gde se utakmica igra.</param>
    /// <param name="DomaciSifra">Naziv domaćeg tima koji igra utakmicu.</param>
    /// <param name="GostujuciSifra">Naziv gostujućeg tima koji igra utakmicu.</param>
    public record UtakmicaDTOinsertUpdate(
        DateTime Datum,
        string Lokacija,
        string Stadion,
        int DomaciSifra,
        int GostujuciSifra
        );
    
    
}
