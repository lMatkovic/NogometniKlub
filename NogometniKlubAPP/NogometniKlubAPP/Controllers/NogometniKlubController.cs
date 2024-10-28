using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;

namespace NogometniKlubAPP.Controllers
{

    
    [Authorize]
    public abstract class NogometniKlubController(NogometniKlubContext context, IMapper mapper) : ControllerBase
    {

    
        protected readonly NogometniKlubContext _context = context;
        protected readonly IMapper _mapper = mapper;
    }
}