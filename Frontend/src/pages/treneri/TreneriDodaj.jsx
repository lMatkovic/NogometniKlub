import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/TrenerService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';


export default function DodajTrenera() {
  const navigate = useNavigate();

  const [klubovi, setKlubovi] = useState([]);
  const [klubSifra, setKlubSifra] = useState(0);

  async function dohvatiKlubove(){
    const odgovor = await KlubService.get();
    setKlubovi(odgovor.poruka);
    setKlubSifra(odgovor.poruka[0].sifra);
  }



  useEffect(()=>{
    dohvatiKlubove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    const odgovor = await Service.dodaj(e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RouteNames.TRENER_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodaj({
        ime: podaci.get('ime'),
        prezime: podaci.get('prezime'),
        klubSifra: parseInt(klubSifra),
        nacionalnost: podaci.get('nacionalnost'),
        iskustvo: (podaci.get('iskustvo'))
    });
}

return (
    <>
        <h2>Dodavanje novog trenera</h2>

        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required />
            </Form.Group>

            <Form.Group className='mb-3' controlId='klub'>
                <Form.Label>Klub</Form.Label>
                <Form.Select
                    onChange={(e) => { setKlubSifra(e.target.value) }}
                >
                    {klubovi && klubovi.map((klub, index) => (
                        <option key={index} value={klub.sifra}>
                            {klub.naziv}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="nacionalnost">
                <Form.Label>Nacionalnost</Form.Label>
                <Form.Control type="text" name="nacionalnost" required />
            </Form.Group>

            <Form.Group controlId="iskustvo">
                <Form.Label>Iskustvo </Form.Label>
                <Form.Control type="text" name="iskustvo" min={1} max={50} />
            </Form.Group>

            <hr />
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
    </>
);
}