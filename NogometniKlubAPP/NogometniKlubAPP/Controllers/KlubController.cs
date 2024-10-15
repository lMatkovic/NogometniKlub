using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;

namespace NogometniKlubAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[Controller]")]
    
    public class KlubController:ControllerBase
    {

        private readonly NogometniKlubContext _context;

        public KlubController(NogometniKlubContext context) 
        {
            _context = context;
        }

        [HttpGet]

        public IActionResult Get() 
        {
            return Ok(_context.Klubovi);
        }


        [HttpGet]
        [Route("{sifra:int}")]

        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Klubovi.Find(sifra));
        }






        [HttpPost]

        public IActionResult Post(Klub klub)
        {
            _context.Klubovi.Add(klub);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, klub);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]


        public IActionResult Put(int sifra, Klub klub)
        {

            var klubBaza = _context.Klubovi.Find(sifra);

            klubBaza.Naziv = klub.Naziv;
            klubBaza.Osnovan = klub.Osnovan;
            klubBaza.Stadion = klub.Stadion;
            klubBaza.Predsjednik = klub.Predsjednik;
            klubBaza.Drzava = klub.Drzava;
            klubBaza.Liga = klub.Liga;

            _context.Klubovi.Update(klubBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });




        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var klubBaza = _context.Klubovi.Find(sifra);

            _context.Klubovi.Remove(klubBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }






    }
}
