
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;
using System.Text.RegularExpressions;

namespace NogometniKlubAPP.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class IgracController(NogometniKlubContext context, IMapper mapper) : NogometniKlubController(context, mapper)
    {


       
        [HttpGet]
        public ActionResult<List<IgracDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<IgracDTORead>>(_context.Igraci.Include(g => g.Klub)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<IgracDTOinsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Igrac? e;
            try
            {
                e = _context.Igraci.Include(g => g.Klub).FirstOrDefault(g => g.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Grupa ne postoji u bazi" });
            }

            return Ok(_mapper.Map<IgracDTOinsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(IgracDTOinsertUpdate dto)
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
                return NotFound(new { poruka = "Klub  ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<Igrac>(dto);
                e.Klub = es;
                _context.Igraci.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<IgracDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, IgracDTOinsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Igrac? e;
                try
                {
                    e = _context.Igraci.Include(g => g.Klub).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Klub ne postoji u bazi" });
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
                    return NotFound(new { poruka = "Klub ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Klub = es;
                _context.Igraci.Update(e);
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
                Igrac? e;
                try
                {
                    e = _context.Igraci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Igrac ne postoji u bazi");
                }
                _context.Igraci.Remove(e);
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

