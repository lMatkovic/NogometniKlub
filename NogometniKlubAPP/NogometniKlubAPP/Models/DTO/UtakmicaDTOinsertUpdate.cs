namespace NogometniKlubAPP.Models.DTO
{
    public record UtakmicaDTOinsertUpdate(
        DateTime Datum,
        string Lokacija,
        string Stadion,
        int DomaciSifra,
        int GostujuciSifra
        );
    
    
}
