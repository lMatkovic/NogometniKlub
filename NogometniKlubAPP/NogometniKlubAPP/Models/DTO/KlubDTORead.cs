namespace NogometniKlubAPP.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o smjeru.
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra kluba.</param>
    /// <param name="Naziv">Naziv kluba.</param>
    /// <param name="Osnovan">Kada je klub osnovan.</param>
    /// <param name="Stadion">stadion kluba.</param>
    /// <param name="Predsjednik">Predsjednik kluba.</param>
    /// <param name="Drzava">Drzava kluba.</param>
    /// <param name="Liga">Ligra kluba.</param>
    public record KlubDTORead(
        int Sifra,
        string Naziv,
        int Osnovan,
        string Stadion,
        string Predsjednik,
        string Drzava,
        string Liga
        );
    

    
}
