import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IgracService from '../../services/IgracService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';

export default function IgracPromjena() {
  const navigate = useNavigate();
  const { sifra } = useParams(); // Dohvati "sifra" iz URL-a

  const [igrac, setIgrac] = useState({});
  const [klubovi, setKlubovi] = useState([]); // Za popunjavanje dropdowna klubova
  const [klubSifra, setKlubSifra] = useState(0); // Trenutno odabrani klub

  // Dohvaća podatke o igraču
  async function dohvatiIgraca() {
    const odgovor = await IgracService.getBySifra(sifra);
    if (odgovor.greska) {
      alert(odgovor.poruka);
      return;
    }
    setIgrac(odgovor.poruka);
    setKlubSifra(odgovor.poruka.klubSifra); // Postavi inicijalni klub igrača
  }

  // Dohvaća listu klubova za select dropdown
  async function dohvatiKlubove() {
    const odgovor = await KlubService.get();
    setKlubovi(odgovor.poruka); // Postavi klubove u state
  }

  // Dohvati podatke o igraču i klubovima prilikom učitavanja komponente
  useEffect(() => {
    dohvatiIgraca();
    dohvatiKlubove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funkcija za slanje promjena
  async function promjena(igracPodaci) {
    const odgovor = await IgracService.promjena(sifra, igracPodaci);
    if (odgovor.greska) {
      alert(odgovor.poruka);
      return;
    }
    navigate(RouteNames.IGRAC_PREGLED); // Preusmjeri na pregled igrača
  }

  // Obrada submit-a forme
  function obradiSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    // Kreiraj objekt s podacima igrača
    promjena({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      klubSifra: parseInt(klubSifra),
      datumRodjenja: podaci.get('datumRodjenja'),
      pozicija: podaci.get('pozicija'),
      brojDresa: parseInt(podaci.get('brojDresa')),
    });
  }

  return (
    <>
      <h2>Promjena podataka o igraču</h2>

      <Form onSubmit={obradiSubmit}>
        {/* Ime igrača */}
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" name="ime" required defaultValue={igrac.ime} />
        </Form.Group>

        {/* Prezime igrača */}
        <Form.Group controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control type="text" name="prezime" required defaultValue={igrac.prezime} />
        </Form.Group>

        {/* Klub */}
        <Form.Group className="mb-3" controlId="klub">
          <Form.Label>Klub</Form.Label>
          <Form.Select
            value={klubSifra}
            onChange={(e) => setKlubSifra(e.target.value)}
          >
            {klubovi && klubovi.map((klub, index) => (
              <option key={index} value={klub.sifra}>
                {klub.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Datum rođenja */}
        <Form.Group controlId="datumRodjenja">
          <Form.Label>Datum rođenja</Form.Label>
          <Form.Control type="date" name="datumRodjenja" required defaultValue={igrac.datumRodjenja} />
        </Form.Group>

        {/* Pozicija */}
        <Form.Group controlId="pozicija">
          <Form.Label>Pozicija</Form.Label>
          <Form.Control type="text" name="pozicija" required defaultValue={igrac.pozicija} />
        </Form.Group>

        {/* Broj dresa */}
        <Form.Group controlId="brojDresa">
          <Form.Label>Broj dresa</Form.Label>
          <Form.Control type="number" name="brojDresa" required min={1} defaultValue={igrac.brojDresa} />
        </Form.Group>

        <hr />
        <Row>
          <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.IGRAC_PREGLED} className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="primary" type="submit" className="siroko">
              Promjeni igrača
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
