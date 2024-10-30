namespace NogometniKlubAPP.Models
{
    /// <summary>
    /// Predstavlja smjer u sustavu.
    /// </summary>
    public class Klub : Entitet
    {
        /// <summary>
        /// Naziv kluba.
        /// </summary>
        public string? Naziv { get; set; }

        /// <summary>
        /// Kada je klub osnovan.
        /// </summary>
        public int? Osnovan { get; set; }

        /// <summary>
        /// Stadion kluba.
        /// </summary>
        public string? Stadion { get; set; }

        /// <summary>
        /// Predsjednik kluba.
        /// </summary>
        public string? Predsjednik { get; set; }

        /// <summary>
        /// Drzava iz koje dolazi klub.
        /// </summary>
        public string? Drzava { get; set; }
        /// <summary>
        /// Liga u kojoj se nalazi klub.
        /// </summary>
        public string? Liga { get; set; }

        /// <summary>
        /// Dobija ili postavlja kolekciju igrača.
        /// Ova kolekcija sadrži sve igrače povezane sa trenutnim entitetom.
        /// </summary>
        public ICollection<Igrac> Igraci { get; set; } = new List<Igrac>();

    }
}
