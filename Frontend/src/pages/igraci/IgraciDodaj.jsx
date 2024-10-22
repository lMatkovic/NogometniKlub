import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/IgracService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';

export default function IgraciDodaj() {
  const navigate = useNavigate();

  
  const [klubovi, setKlubovi] = useState([]);
  const [klubSifra, setKlubSifra] = useState(0);
  const [brojDresa, setBrojDresa] = useState(0);

  
  async function dohvatiKlubove() {
    try {
      const odgovor = await KlubService.get();
      if (odgovor && !odgovor.greska) {
        setKlubovi(odgovor.poruka); 
        setKlubSifra(odgovor.poruka[0].sifra); 
      } else {
        alert("Greška prilikom dohvaćanja klubova.");
      }
    } catch (error) {
      console.error("Greška u dohvatanju klubova:", error);
      alert("Greška prilikom dohvaćanja klubova.");
    }
  }

  useEffect(() => {
    dohvatiKlubove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  async function dodajIgraca(podaci) {
    try {
      const odgovor = await Service.dodaj(podaci);
      if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
      }
      navigate(RouteNames.IGRAC_PREGLED); 
    } catch (error) {
      console.error("Greška prilikom dodavanja igrača:", error);
      alert("Greška prilikom dodavanja igrača.");
    }
  }

  
  function obradiSubmit(e) {
    e.preventDefault();
    
    const podaci = new FormData(e.target);
    
    dodajIgraca({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      datumRodjenja: podaci.get('datumRodjenja'),
      pozicija: podaci.get('pozicija'),
      brojDresa: parseInt(podaci.get('brojDresa')),
      klubSifra: parseInt(klubSifra),
    });
  }

  return (
    <Container>
      <h2>Dodavanje novog igrača</h2>

      <Form onSubmit={obradiSubmit}>
        {/* Ime */}
        <Form.Group className="mb-3" controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" name="ime" required />
        </Form.Group>

        {/* Prezime */}
        <Form.Group className="mb-3" controlId="prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control type="text" name="prezime" required />
        </Form.Group>

        {/* Datum rođenja */}
        <Form.Group className="mb-3" controlId="datumRodjenja">
          <Form.Label>Datum rođenja</Form.Label>
          <Form.Control type="date" name="datumRodjenja" required />
        </Form.Group>

        {/* Pozicija */}
        <Form.Group className="mb-3" controlId="pozicija">
          <Form.Label>Pozicija</Form.Label>
          <Form.Control type="text" name="pozicija" required />
        </Form.Group>

        {/* Broj dresa */}
        <Form.Group className="mb-3" controlId="brojDresa">
          <Form.Label>Broj dresa</Form.Label>
          <Form.Control 
            type="number" 
            name="brojDresa" 
            value={brojDresa} 
            min={1} 
            max={99} 
            onChange={(e) => setBrojDresa(e.target.value)} 
            required 
          />
        </Form.Group>

        {/* Klub */}
        <Form.Group className="mb-3" controlId="klub">
          <Form.Label>Klub</Form.Label>
          <Form.Select 
            value={klubSifra}
            onChange={(e) => setKlubSifra(e.target.value)}
          >
            {klubovi && klubovi.map((klub) => (
              <option key={klub.sifra} value={klub.sifra}>
                {klub.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Gumbi */}
        <Row>
          <Col xs={6}>
            <Link to={RouteNames.IGRAC_PREGLED} className="btn btn-danger w-100">
              Odustani
            </Link>
          </Col>
          <Col xs={6}>
            <Button variant="primary" type="submit" className="w-100">
              Dodaj igrača
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
