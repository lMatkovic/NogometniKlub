using Microsoft.AspNetCore.Mvc;
using NogometniKlubAPP.Data;
using NogometniKlubAPP.Models;

namespace NogometniKlubAPP.Controllers
{
    /*

    [ApiController]
    [Route("api/v1/[Controller]")]

    public class TrenerController:ControllerBase
    {


        private readonly NogometniKlubContext _context;

        public TrenerController(NogometniKlubContext context)
        {
            _context = context;
        }

        [HttpGet]

        public IActionResult Get()
        {
            return Ok(_context.Treneri);
        }


        [HttpGet]
        [Route("{sifra:int}")]

        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Treneri.Find(sifra));
        }






        [HttpPost]

        public IActionResult Post(Trener trener)
        {
            _context.Treneri.Add(trener);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, trener);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("appication/json")]

        public IActionResult Put(int sifra, Trener trener)
        {

            var trenerBaza = _context.Treneri.Find(sifra);

            trenerBaza.Ime = trener.Ime;
            trenerBaza.Prezime = trener.Prezime;
            trenerBaza.Nacionalnost = trener.Nacionalnost;
            trenerBaza.Iskustvo = trener.Iskustvo;
            

            _context.Treneri.Update(trenerBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });




        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var trenerbaza = _context.Treneri.Find(sifra);

            _context.Treneri.Remove(trenerbaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }


    }
    */
    
}

