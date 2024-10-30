using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;

namespace NogometniKlubAPP.Controllers
{
    /// <summary>
    /// Apstraktna klasa NogometniKlubController koja služi kao osnovna klasa za sve kontrolere u aplikaciji.
    /// </summary>
    /// <param name="context">Instanca NogometniKlubContext klase koja se koristi za pristup bazi podataka.</param>
    /// <param name="mapper">Instanca IMapper sučelja koja se koristi za mapiranje objekata.</param>

    [Authorize]
    public abstract class NogometniKlubController(NogometniKlubContext context, IMapper mapper) : ControllerBase
    {

        /// <summary>
        /// Kontekst baze podataka.
        /// </summary>
        protected readonly NogometniKlubContext _context = context;

        /// <summary>
        /// Mapper za mapiranje objekata.
        /// </summary>
        protected readonly IMapper _mapper = mapper;
    }
}