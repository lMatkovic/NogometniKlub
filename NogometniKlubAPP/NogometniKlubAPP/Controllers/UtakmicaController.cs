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
    public class UtakmicaController(NogometniKlubContext context, IMapper mapper) : NogometniKlubController(context, mapper)
    {


        // 
        [HttpGet]
        public ActionResult<List<UtakmicaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<UtakmicaDTORead>>(_context.Utakmice.Include(g => g.Domaci)));

                
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<UtakmicaDTOinsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Utakmica? e;
            try
            {
                e = _context.Utakmice.Include(g => g.Domaci).FirstOrDefault(g => g.Sifra == sifra);
                
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Utakmica ne postoji u bazi" });
            }

            return Ok(_mapper.Map<TrenerDTOinsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(TrenerDTOinsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Klub? es;
            try
            {
                es = _context.Klubovi.Find(dto.KlubSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = $"Klub sa šifrom {dto.KlubSifra} nije pronađen." });
            }

            try
            {
                var e = _mapper.Map<Trener>(dto);
                e.Klub = es;
                _context.Treneri.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<TrenerDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, TrenerDTOinsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Utakmica? e;
                try
                {
                    e = _context.Utakmice.Include(g => g.Domaci).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Utakmica ne postoji u bazi" });
                }

                Klub? es;
                try
                {
                    es = _context.Klubovi.Find(dto.KlubSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = $"Klub sa šifrom {dto.KlubSifra} nije pronađen." });
                }

                e = _mapper.Map(dto, e);
                e.Domaci = es;
                _context.Utakmice.Update(e);
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
                Utakmica? e;
                try
                {
                    e = _context.Utakmice.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Utakmica ne postoji u bazi");
                }
                _context.Utakmice.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


    }


}
