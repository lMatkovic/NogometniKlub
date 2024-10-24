import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/UtakmicaService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';

export default function UtakmicaPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [klubovi, setKlubovi] = useState([]);
  const [domaciSifra, setDomaciSifra] = useState(0);
  const [gostujuciSifra, setGostujuciSifra] = useState(0);
  const [utakmica, setUtakmica] = useState({});

  async function dohvatiKlubove() {
    const odgovor = await KlubService.get();
    setKlubovi(odgovor.poruka);
  }

  async function dohvatiUtakmice() {
    const odgovor = await Service.getBySifra(routeParams.sifra);
    if (odgovor.greska) {
      alert(odgovor.poruka);
      return;
    }
    let utakmica = odgovor.poruka;
    setUtakmica(utakmica);
    setDomaciSifra(utakmica.domaciSifra);
    setGostujuciSifra(utakmica.gostujuciSifra);
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiKlubove();
    await dohvatiUtakmice();
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  async function promjena(sifra, utakmicaData) {
    const odgovor = await Service.promjena(sifra, utakmicaData);
    if (odgovor.greska) {
      alert(odgovor.poruka);
      return;
    }
    navigate(RouteNames.UTAKMICA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    const utakmicaData = {
      datum: podaci.get('datum'),
      lokacija: podaci.get('lokacija'),
      stadion: podaci.get('stadion'),
      domaciSifra: parseInt(domaciSifra, 10), 
      gostujuciSifra: parseInt(gostujuciSifra, 10), 
    };

    console.log("Podaci koje šaljemo:", utakmicaData); 

   
    promjena(routeParams.sifra, utakmicaData);
  }

  return (
    <>
      <h2>Mjenjanje podatake utakmice</h2>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="datum">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="datetime-local" name="datum" required defaultValue={utakmica.datum} />
        </Form.Group>

        <Form.Group controlId="lokacija">
          <Form.Label>Lokacija</Form.Label>
          <Form.Control type="text" name="lokacija" required defaultValue={utakmica.lokacija} />
        </Form.Group>

        <Form.Group controlId="stadion">
          <Form.Label>Stadion</Form.Label>
          <Form.Control type="text" name="stadion" required defaultValue={utakmica.stadion} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='domaciSifra'>
          <Form.Label>Domaci Klub</Form.Label>
          <Form.Select
            value={domaciSifra}
            onChange={(e) => { setDomaciSifra(e.target.value) }}
          >
            {klubovi && klubovi.map((s, index) => (
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='gostujuciSifra'>
          <Form.Label>Gostujuci Klub</Form.Label>
          <Form.Select
            value={gostujuciSifra}
            onChange={(e) => { setGostujuciSifra(e.target.value) }}
          >
            {klubovi && klubovi.map((s, index) => (
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <hr />
        <Row>
          <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.UTAKMICA_PREGLED} className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="primary" type="submit" className="siroko">
              Promjeni Utakmicu
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
