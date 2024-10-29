using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace NogometniKlubAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PocetnaController(NogometniKlubContext _context, IMapper _mapper) : ControllerBase
    {



        [HttpGet]
        [Route("DostupniKlubovi")]
        public ActionResult<List<KlubDTORead>> DostupniKlubovi()
        {
            try
            {

                var klubovi = _context.Klubovi
                    .ToList();

                var lista = new List<object>();
                foreach (var klub in klubovi)
                {
                    lista.Add(new {Naziv = klub.Naziv });
                }

                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }



        [HttpGet]
        [Route("Ukupnoigraca")]
        public IActionResult UkupnoIgraca()
        {
            try
            {
                return Ok(new { poruka = _context.Igraci.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }






    }

}
