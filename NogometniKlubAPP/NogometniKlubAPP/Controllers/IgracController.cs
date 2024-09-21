
using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;

namespace NogometniKlubAPP.Controllers
{
/*
    [ApiController]
    [Route("api/v1/[Controller]")]

    public class IgracController:ControllerBase
    {

        private readonly NogometniKlubContext _context;

        public IgracController(NogometniKlubContext context)
        {
            _context = context;
        }

        [HttpGet]

        public IActionResult Get()
        {
            return Ok(_context.Igraci);
        }


        [HttpGet]
        [Route("{sifra:int}")]

        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Igraci.Find(sifra));
        }






        [HttpPost]

        public IActionResult Post(Igrac igrac)
        {
            _context.Igraci.Add(igrac);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, igrac);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("appication/json")]

        public IActionResult Put(int sifra, Igrac igrac)
        {

            var igracBaza = _context.Igraci.Find(sifra);

            igracBaza.Ime = igrac.Ime;
            igracBaza.Prezime = igrac.Prezime;
            igracBaza.DatumRodjenja = igrac.DatumRodjenja;
            igracBaza.Pozicija = igrac.Pozicija;
            igracBaza.BrojDresa = igrac.BrojDresa;

            _context.Igraci.Update(igracBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });




        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var igracbaza = _context.Igraci.Find(sifra);

            _context.Igraci.Remove(igracbaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }






    }
*/
}
