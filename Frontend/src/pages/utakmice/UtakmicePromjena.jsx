import { Button, Col, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/UtakmicaService';
import KlubService from '../../services/KlubService';
import { RouteNames } from '../../constants';
import useLoading from "../../hooks/useLoading";

export default function UtakmicaPromjena() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const routeParams = useParams();

  const [klubovi, setKlubovi] = useState([]);
  const [domaciSifra, setDomaciSifra] = useState(0);
  const [gostujuciSifra, setGostujuciSifra] = useState(0);
 

  const [utakmica, setUtakmica] = useState({});

  async function dohvatiKlubove(){
    showLoading();
    const odgovor = await KlubService.get();
    hideLoading();
    setKlubovi(odgovor.poruka);
  }

  async function dohvatiUtakmicu() {
    showLoading();
    const odgovor = await Service.getBySifra(routeParams.sifra);
    hideLoading();
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }
    let utakmica = odgovor.poruka;
    setUtakmica(utakmica);
    setDomaciSifra(utakmica.domaciSifra);
    setGostujuciSifra (utakmica.gostujuciSifra)
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiKlubove();
    await dohvatiUtakmicu();
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
    navigate(RouteNames.UTAKMICA_PREGLED);
}

function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    promjena({
      datum: podaci.get('datum'),
      lokacija: podaci.get('lokacija'),
      stadion: podaci.get('stadion'),
      domaciSifra: parseInt(domaciSifra),
      gostujuciSifra: parseInt(gostujuciSifra),
    
      
    });
  }

  return (
      <>
       <h2>Mjenjanje podatake Utakmice</h2>
      
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="datum">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" name="datum" required defaultValue={utakmica.datum}/>
          </Form.Group>

          <Form.Group controlId="lokacija">
              <Form.Label>Lokacija</Form.Label>
              <Form.Control type="text" name="lokacija" required defaultValue={utakmica.lokacija}/>
          </Form.Group>

          <Form.Group controlId="stadion">
              <Form.Label>Stadion</Form.Label>
              <Form.Control type="text" name="stadion" required defaultValue={utakmica.stadion}/>
          </Form.Group>


          <Form.Group className='mb-3' controlId='domaciSifra'>
            <Form.Label>Domaci Klub</Form.Label>
            <Form.Select
            value={domaciSifra}
            onChange={(e)=>{setDomaciSifra(e.target.value)}}
            >
            {klubovi && klubovi.map((s,index)=>(
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
            onChange={(e)=>{setGostujuciSifra(e.target.value)}}
            >
            {klubovi && klubovi.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

        

          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RouteNames.UTAKMICA_PREGLED}
              className="btn btn-danger siroko">
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