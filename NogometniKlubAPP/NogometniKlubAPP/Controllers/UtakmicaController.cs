using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;
using NogometniKlubAPP.Models.DTO;

namespace NogometniKlubAPP.Controllers
{

    /// <summary>
    /// Kontroler za upravljanje utakmicama u aplikaciji.
    /// Ovaj kontroler omogućuje CRUD operacije (stvaranje, čitanje, ažuriranje, brisanje) za utakmice.
    /// </summary>
    /// <remarks>
    /// Kontroler koristi <see cref="NogometniKlubContext"/> za interakciju s bazom podataka
    /// i <see cref="IMapper"/> za mapiranje između entiteta i DTO objekata.
    /// </remarks>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UtakmicaController : NogometniKlubController
    {  /// <summary>
       /// Inicijalizira novu instancu <see cref="UtakmicaController"/> klase.
       /// </summary>
       /// <param name="context">Instanca <see cref="NogometniKlubContext"/> koja se koristi za pristup bazi podataka.</param>
       /// <param name="mapper">Instanca <see cref="IMapper"/> koja se koristi za mapiranje objekata.</param>
        public UtakmicaController(NogometniKlubContext context, IMapper mapper) : base(context, mapper) { }
       

        /// <summary>
        /// Dohvaća sve utakmice.
        /// </summary>
        /// <returns>Lista utakmice.</returns>
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

        /// <summary>
        /// Dohvaća utakmice prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra utakmica.</param>
        /// <returns>utakmice.</returns>
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

        /// <summary>
        /// Dodaje nove utakmice.
        /// </summary>
        /// <param name="dto">Podaci o utakmici.</param>
        /// <returns>Status kreiranja.</returns>
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

        /// <summary>
        /// Ažurira utakmice prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra utakmice.</param>
        /// <param name="dto">Podaci o utakmici.</param>
        /// <returns>Status ažuriranja.</returns>
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

        /// <summary>
        /// Briše utakmice prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra utakmica.</param>
        /// <returns>Status brisanja.</returns>
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
