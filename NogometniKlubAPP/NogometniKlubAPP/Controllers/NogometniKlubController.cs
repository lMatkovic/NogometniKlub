using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;

namespace NogometniKlubAPP.Controllers
{
    public abstract class NogometniKlubController:ControllerBase
    {

       
        protected readonly NogometniKlubContext _context;

        protected readonly IMapper _mapper;


       
        public NogometniKlubController(NogometniKlubContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    }
}
