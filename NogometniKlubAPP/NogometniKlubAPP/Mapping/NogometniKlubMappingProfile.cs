using AutoMapper;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;

namespace NogometniKlubAPP.Mapping
{
    public class NogometniKlubMappingProfile:Profile
    {
        public NogometniKlubMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Klub, KlubDTORead>();
            CreateMap<KlubDTOinsertUpdate, Klub>();

            CreateMap<Igrac, IgracDTORead>();
            CreateMap<IgracDTOinsertUpdate, Igrac>();



        }

    }
}
