using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;

namespace NogometniKlubAPP.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje klubova u aplikaciji.
    /// </summary>
    /// <param name="context">Instanca EdunovaContext klase koja se koristi za pristup bazi podataka.</param>
    /// <param name="mapper">Instanca IMapper sučelja koja se koristi za mapiranje objekata.</param>
    [ApiController]
       [Route("api/v1/[controller]")]
       public class KlubController(NogometniKlubContext context, IMapper mapper) : NogometniKlubController(context, mapper)
       {


        /// <summary>
        /// Dohvaća sve klubove.
        /// </summary>
        /// <returns>Lista DTO objekata klubova.</returns>
        [HttpGet]
            public ActionResult<List<KlubDTORead>> Get()
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                try
                {
                    return Ok(_mapper.Map<List<KlubDTORead>>(_context.Klubovi));
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }

            }

        /// <summary>
        /// Dohvaća klub prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra kluba.</param>
        /// <returns>DTO objekt kluba.</returns>
        [HttpGet]
            [Route("{sifra:int}")]
            public ActionResult<KlubDTORead> GetBySifra(int sifra)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                Klub? e;
                try
                {
                    e = _context.Klubovi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Klub ne postoji u bazi" });
                }

                return Ok(_mapper.Map<KlubDTORead>(e));
            }

        /// <summary>
        /// Dodaje novi klub.
        /// </summary>
        /// <param name="dto">DTO objekt za unos ili ažuriranje kluba.</param>
        /// <returns>Status kreiranja i DTO objekt novog kluba.</returns>
        [HttpPost]
            public IActionResult Post(KlubDTOinsertUpdate dto)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                try
                {
                    var e = _mapper.Map<Klub>(dto);
                    _context.Klubovi.Add(e);
                    _context.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, _mapper.Map<KlubDTORead>(e));
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }



            }

        /// <summary>
        /// Ažurira postojeći klub prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra kluba.</param>
        /// <param name="dto">DTO objekt za unos ili ažuriranje kluba.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut]
            [Route("{sifra:int}")]
            [Produces("application/json")]
            public IActionResult Put(int sifra, KlubDTOinsertUpdate dto)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                try
                {
                    Klub? e;
                    try
                    {
                        e = _context.Klubovi.Find(sifra);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { poruka = ex.Message });
                    }
                    if (e == null)
                    {
                        return NotFound(new { poruka = "Klub ne postoji u bazi" });
                    }
                    e = _mapper.Map(dto, e);

                    _context.Klubovi.Update(e);
                    _context.SaveChanges();

                    return Ok(new { poruka = "Uspješno promjenjeno" });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }

            }

        /// <summary>
        /// Briše klub prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra kluba.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete]
            [Route("{sifra:int}")]
            [Produces("application/json")]
            public IActionResult Delete(int sifra)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                try
                {
                    Klub? e;
                    try
                    {
                        e = _context.Klubovi.Find(sifra);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { poruka = ex.Message });
                    }
                    if (e == null)
                    {
                        return NotFound("Klub ne postoji u bazi");
                    }
                    _context.Klubovi.Remove(e);
                    _context.SaveChanges();
                    return Ok(new { poruka = "Uspješno obrisano" });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
            }
        /// <summary>
        /// Dohvaća graf kluba.
        /// </summary>
        /// <returns>Lista grafova kluba.</returns>
        [HttpGet]
        [Route("GrafKluba")]
        public ActionResult<List<GrafKlubDTO>> GrafKlub()
        {
            try
            {
                return Ok(_mapper.Map<List<GrafKlubDTO>>(_context.Klubovi.Include(g => g.Igraci)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }






        }


}
