import { Button, Col, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/TrenerService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';


export default function TrenerPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [klubovi, setKlubovi] = useState([]);
  const [klubSifra, setKlubSifra] = useState(0);

  const [trener, setTrener] = useState({});

  async function dohvatiKlubove(){
    const odgovor = await KlubService.get();
    setKlubovi(odgovor.poruka);
  }

  async function dohvatiTrenera() {
    const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }
    let trener = odgovor.poruka;
    setTrener(trener);
    setKlubSifra(trener.klubSifra); 
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiKlubove();
    await dohvatiTrenera();
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function promjena(e){
    const odgovor = await Service.promjena(routeParams.sifra,e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RouteNames.TRENER_PREGLED);
}

function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    promjena({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      klubSifra: parseInt(klubSifra),
      nacionalnost: podaci.get('nacionalnost'),
      iskustvo: podaci.get('iskustvo'),
      
    });
  }

  return (
      <>
       <h2>Mjenjanje podatake trenera</h2>
      
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="ime">
              <Form.Label>Ime</Form.Label>
              <Form.Control type="text" name="ime" required defaultValue={trener.ime}/>
          </Form.Group>

          <Form.Group controlId="prezime">
              <Form.Label>Prezime</Form.Label>
              <Form.Control type="text" name="prezime" required defaultValue={trener.prezime}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='klub'>
            <Form.Label>Klub</Form.Label>
            <Form.Select
            value={klubSifra}
            onChange={(e)=>{setKlubSifra(e.target.value)}}
            >
            {klubovi && klubovi.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="nacionalnost">
              <Form.Label>Nacionalnost</Form.Label>
              <Form.Control type="text" name="nacionalnost" required defaultValue={trener.nacionalnost}/>
          </Form.Group>

          <Form.Group controlId="iskustvo">
              <Form.Label>Iskustvo</Form.Label>
              <Form.Control type="text" name="iskustvo" required defaultValue={trener.iskustvo}/>
          </Form.Group>


          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RouteNames.TRENER_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Promjeni Trenera
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}