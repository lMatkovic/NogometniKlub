﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;
using System.Text.RegularExpressions;

namespace NogometniKlubAPP.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje trenerima.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TrenerController(NogometniKlubContext context, IMapper mapper) : NogometniKlubController(context, mapper)
    {


        /// <summary>
        /// Dohvaća sve trenere.
        /// </summary>
        /// <returns>Lista trenera.</returns>
        [HttpGet]
        public ActionResult<List<TrenerDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<TrenerDTORead>>(_context.Treneri.Include(g => g.Klub)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        /// <summary>
        /// Dohvaća trenere prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra trenera.</param>
        /// <returns>Trener.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<TrenerDTOinsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Trener? e;
            try
            {
                e = _context.Treneri.Include(g => g.Klub).FirstOrDefault(g => g.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Trener ne postoji u bazi" });
            }

            return Ok(_mapper.Map<TrenerDTOinsertUpdate>(e));
        }
        /// <summary>
        /// Dodaje novog trenera.
        /// </summary>
        /// <param name="dto">Podaci o treneru.</param>
        /// <returns>Status kreiranja.</returns>
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
        /// <summary>
        /// Ažurira trenera prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra trenera.</param>
        /// <param name="dto">Podaci o treneru.</param>
        /// <returns>Status ažuriranja.</returns>
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
                Trener? e;
                try
                {
                    e = _context.Treneri.Include(g => g.Klub).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Trener ne postoji u bazi" });
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
                e.Klub = es;
                _context.Treneri.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }
        /// <summary>
        /// Briše trenera prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra trenera.</param>
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
                Trener? e;
                try
                {
                    e = _context.Treneri.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Trener ne postoji u bazi");
                }
                _context.Treneri.Remove(e);
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

