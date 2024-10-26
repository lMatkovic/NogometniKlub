using AutoMapper;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;
using System.Text.RegularExpressions;

namespace NogometniKlubAPP.Mapping
{
    public class NogometniKlubMappingProfile : Profile
    {
        public NogometniKlubMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Klub, KlubDTORead>();
            CreateMap<KlubDTOinsertUpdate, Klub>();



            CreateMap<Igrac, IgracDTORead>()
             .ConstructUsing(entitet =>
              new IgracDTORead(
            entitet.Sifra ?? 0,  
            entitet.Ime ?? "",
            entitet.Prezime ?? "",
            entitet.Klub.Naziv ?? "",
            entitet.DatumRodjenja ?? DateTime.MinValue,
            entitet.Pozicija ?? "",
            entitet.BrojDresa ?? 0,
            PutanjaDatoteke(entitet)
            ));
            CreateMap<IgracDTOinsertUpdate, Igrac>();




            CreateMap<Trener, TrenerDTORead>()
              .ForCtorParam(
                  "KlubNaziv",
                  opt => opt.MapFrom(src => src.Klub.Naziv)
              );
            CreateMap<Trener, TrenerDTOinsertUpdate>().ForMember(
                    dest => dest.KlubSifra,
                    opt => opt.MapFrom(src => src.Klub.Sifra)
                );
            CreateMap<TrenerDTOinsertUpdate, Trener>();



            CreateMap<Utakmica, UtakmicaDTORead>()
               .ForCtorParam(
                   "DomaciNaziv",
                   opt => opt.MapFrom(src => src.Domaci.Naziv)
               )
               .ForCtorParam(
                   "GostujuciNaziv",
                   opt => opt.MapFrom(src => src.Gostujuci.Naziv)
               );


            CreateMap<UtakmicaDTOinsertUpdate, Utakmica>()
                .ForMember(dest => dest.Domaci, opt => opt.MapFrom(src => new Klub { Sifra = src.DomaciSifra }))
                .ForMember(dest => dest.Gostujuci, opt => opt.MapFrom(src => new Klub { Sifra = src.GostujuciSifra }));



          
        }

        private static string? PutanjaDatoteke(Igrac e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "igraci" + ds + e.Sifra + ".png");
                return File.Exists(slika) ? "/slike/igraci/" + e.Sifra + ".png" : null;
            }
            catch
            {
                return null;
            }


        }
    }
}




