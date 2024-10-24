namespace NogometniKlubAPP.Models.DTO
{
    public record TrenerDTORead(
        int Sifra,
        string Ime,
        string Prezime,
        string? KlubNaziv,
        string Nacionalnost,
        string Iskustvo
        );
    
}
