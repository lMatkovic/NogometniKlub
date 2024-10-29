using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;

namespace NogometniKlubAPP.Controllers
{

       [ApiController]
       [Route("api/v1/[controller]")]
       public class KlubController(NogometniKlubContext context, IMapper mapper) : NogometniKlubController(context, mapper)
       {


            
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
