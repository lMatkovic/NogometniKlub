using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;

namespace NogometniKlubAPP.Controllers
{

    [ApiController]
    [Route("api/v1/[Controller]")]

    public class UtakmicaController:ControllerBase
    {


        private readonly NogometniKlubContext _context;

        public UtakmicaController(NogometniKlubContext context)
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
            return Ok(_context.Utakmice.Find(sifra));
        }






        [HttpPost]

        public IActionResult Post(Utakmica utakmica)
        {
            _context.Utakmice.Add(utakmica);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, utakmica);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("appication/json")]

        public IActionResult Put(int sifra, Utakmica utakmica)
        {

            var utakmicaBaza = _context.Utakmice.Find(sifra);

            utakmicaBaza.Datum = utakmica.Datum;
            utakmicaBaza.Lokacija = utakmica.Lokacija;
            utakmicaBaza.Stadion = utakmica.Stadion;

            _context.Utakmice.Update(utakmicaBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });




        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var utakmicabaza = _context.Utakmice.Find(sifra);

            _context.Utakmice.Remove(utakmicabaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }


    }
}
