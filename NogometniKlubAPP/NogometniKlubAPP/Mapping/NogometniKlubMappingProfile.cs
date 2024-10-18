using AutoMapper;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;
using System.Text.RegularExpressions;

namespace NogometniKlubAPP.Mapping
{
    public class NogometniKlubMappingProfile:Profile
    {
        public NogometniKlubMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Klub, KlubDTORead>();
            CreateMap<KlubDTOinsertUpdate, Klub>();



            CreateMap<Igrac, IgracDTORead>()
              .ForCtorParam(
                  "KlubNaziv",
                  opt => opt.MapFrom(src => src.Klub.Naziv)
              );
            CreateMap<Igrac, IgracDTOinsertUpdate>().ForMember(
                    dest => dest.KlubSifra,
                    opt => opt.MapFrom(src => src.Klub.Sifra)
                );
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





        }

    }
}
