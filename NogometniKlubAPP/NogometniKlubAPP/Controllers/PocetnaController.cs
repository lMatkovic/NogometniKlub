using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace NogometniKlubAPP.Controllers
{
    /// <summary>
    /// Kontroler za početne operacije.
    /// </summary>
    /// <param name="_context">Kontekst baze podataka.</param>
    /// <param name="_mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PocetnaController(NogometniKlubContext _context, IMapper _mapper) : ControllerBase
    {


        /// <summary>
        /// Dohvaća dostupne klubove.
        /// </summary>
        /// <returns>Lista dostupnih klubova.</returns>
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


        /// <summary>
        /// Dohvaća ukupan broj igraca.
        /// </summary>
        /// <returns>Ukupan broj igraca.</returns>
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
