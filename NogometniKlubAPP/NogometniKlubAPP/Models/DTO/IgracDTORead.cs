namespace NogometniKlubAPP.Models.DTO
{
    public record IgracDTORead(
        int Sifra,
        string Ime,
        string? KlubNaziv,
        string Prezime,
        DateTime DatumRodjenja,
        string Pozicija,
        int BrojDresa
        );
    
}
