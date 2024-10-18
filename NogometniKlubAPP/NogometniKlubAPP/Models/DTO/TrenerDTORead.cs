namespace NogometniKlubAPP.Models.DTO
{
    public record TrenerDTORead(
        int Sifra,
        string Ime,
        string? KlubNaziv,
        string Prezime,
        string Nacionalnost,
        string Iskustvo
        );
    
}
