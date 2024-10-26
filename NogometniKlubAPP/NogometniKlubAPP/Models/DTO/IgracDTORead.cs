namespace NogometniKlubAPP.Models.DTO
{
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
