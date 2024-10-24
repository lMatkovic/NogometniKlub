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
    public class UtakmicaController : NogometniKlubController
    {
        public UtakmicaController(NogometniKlubContext context, IMapper mapper) : base(context, mapper) { }

        
        [HttpGet]
        public ActionResult<List<UtakmicaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                
                var utakmice = _context.Utakmice
                    .Include(g => g.Domaci)
                    .Include(g => g.Gostujuci)
                    .ToList();

                var utakmiceDto = _mapper.Map<List<UtakmicaDTORead>>(utakmice);
                return Ok(utakmiceDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<UtakmicaDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var utakmica = _context.Utakmice
                    .Include(g => g.Domaci)
                    .Include(g => g.Gostujuci)
                    .FirstOrDefault(g => g.Sifra == sifra);

                if (utakmica == null)
                {
                    return NotFound(new { poruka = "Utakmica ne postoji u bazi" });
                }

                var utakmicaDto = _mapper.Map<UtakmicaDTORead>(utakmica);
                return Ok(utakmicaDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        
        [HttpPost]
        public IActionResult Post(UtakmicaDTOinsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var domaciKlub = _context.Klubovi.Find(dto.DomaciSifra);
                var gostujuciKlub = _context.Klubovi.Find(dto.GostujuciSifra);

                if (domaciKlub == null || gostujuciKlub == null)
                {
                    return NotFound(new { poruka = "Jedan ili oba kluba nisu pronađena." });
                }

                var utakmica = _mapper.Map<Utakmica>(dto);
                utakmica.Domaci = domaciKlub;
                utakmica.Gostujuci = gostujuciKlub;

                _context.Utakmice.Add(utakmica);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, _mapper.Map<UtakmicaDTORead>(utakmica));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, UtakmicaDTOinsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var utakmica = _context.Utakmice
                    .Include(g => g.Domaci)
                    .Include(g => g.Gostujuci)
                    .FirstOrDefault(x => x.Sifra == sifra);

                if (utakmica == null)
                {
                    return NotFound(new { poruka = "Utakmica ne postoji u bazi" });
                }

                var domaciKlub = _context.Klubovi.Find(dto.DomaciSifra);
                var gostujuciKlub = _context.Klubovi.Find(dto.GostujuciSifra);

                if (domaciKlub == null || gostujuciKlub == null)
                {
                    return NotFound(new { poruka = "Jedan ili oba kluba nisu pronađena." });
                }

                utakmica = _mapper.Map(dto, utakmica);
                utakmica.Domaci = domaciKlub;
                utakmica.Gostujuci = gostujuciKlub;

                _context.Utakmice.Update(utakmica);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        
        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var utakmica = _context.Utakmice.Find(sifra);

                if (utakmica == null)
                {
                    return NotFound(new { poruka = "Utakmica ne postoji u bazi" });
                }

                _context.Utakmice.Remove(utakmica);
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
