import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/UtakmicaService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';


export default function DodajUtakmicu() {
  const navigate = useNavigate();

  const [klubovi, setKlubovi] = useState([]);
  const [domaciSifra, setDomaciSifra] = useState(0);
  const [gostujuciSifra, setGostujuciSifra] = useState(0);

  async function dohvatiKlubove(){
    const odgovor = await KlubService.get();
    setKlubovi(odgovor.poruka);
    setDomaciSifra(odgovor.poruka[0].sifra);
    setGostujuciSifra(odgovor.poruka[0].sifra);
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
    navigate(RouteNames.UTAKMICA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodaj({
        datum: podaci.get('datum'),
        lokacija: podaci.get('lokacija'),
        stadion: podaci.get('stadion'),
        domaciSifra: parseInt(domaciSifra),
        gostujuciSifra: parseInt(gostujuciSifra),
        
    });
}

return (
    <>
        <h2>Dodavanje nove Utakmice</h2>

        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="datum">
                <Form.Label>Datum</Form.Label>
                <Form.Control type="date" name="datum" required />
            </Form.Group>

            <Form.Group controlId="lokacija">
                <Form.Label>Lokacija</Form.Label>
                <Form.Control type="text" name="lokacija" required />
            </Form.Group>

            <Form.Group controlId="stadion">
                <Form.Label>Stadion</Form.Label>
                <Form.Control type="text" name="stadion" required />
            </Form.Group>

            <Form.Group className='mb-3' controlId='domaciSifra'>
                <Form.Label>Domaci Klub</Form.Label>
                <Form.Select
                    onChange={(e) => { setDomaciSifra(e.target.value) }}
                >
                    {klubovi && klubovi.map((klub, index) => (
                        <option key={index} value={klub.sifra}>
                            {klub.naziv}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>


            <Form.Group className='mb-3' controlId='gostujuciSifra'>
                <Form.Label>Gostujuci Klub</Form.Label>
                <Form.Select
                    onChange={(e) => { setGostujuciSifra(e.target.value) }}
                >
                    {klubovi && klubovi.map((klub, index) => (
                        <option key={index} value={klub.sifra}>
                            {klub.naziv}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>


          
            <hr />
            <Row>
          <Col xs={6}>
            <Link to={RouteNames.UTAKMICA_PREGLED} className="btn btn-danger w-100">
              Odustani
            </Link>
          </Col>
          <Col xs={6}>
            <Button variant="primary" type="submit" className="w-100">
              Dodaj Utakmicu
            </Button>
          </Col>
        </Row>
        </Form>
    </>
);
}