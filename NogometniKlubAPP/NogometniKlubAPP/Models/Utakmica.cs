namespace NogometniKlubAPP.Models
{
    public class Utakmica
    {
        public DateTime? Datum { get; set; }
        public string? Lokacija { get; set; }
        public string? Stadion { get; set; }
        public Klub? DomaciKlub { get; set; }
        public Klub? gostujuciKlub { get; set; }
    }
}
