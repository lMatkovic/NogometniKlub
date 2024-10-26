import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import IgracService from "../../services/IgracService";
import KlubService from '../../services/KlubService';
import { useEffect, useState, useRef } from "react";
import useLoading from "../../hooks/useLoading";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import nepoznato from '../../assets/nepoznato.png'; 



export default function IgraciPromjena(){

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
     
    const [igrac,setIgrac] = useState({});
    const [klubovi, setKlubovi] = useState([]); 
    const [klubSifra, setKlubSifra] = useState(0); 

    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);


    async function dohvatiIgrace(){
        showLoading();
        const odgovor = await IgracService.getBySifra(routeParams.sifra);
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setIgrac(odgovor.poruka);
        setKlubSifra(odgovor.poruka.klubSifra); 

        if(odgovor.poruka.slika!=null){
            setTrenutnaSlika(APP_URL + odgovor.poruka.slika + `?${Date.now()}`); // ovaj Date je da uvijek dovuče zadnju sliku
          }else{
            setTrenutnaSlika(nepoznato);
          }
    }

    async function dohvatiKlubove() {
      const odgovor = await KlubService.get(); // Koristi KlubService za dohvat klubova
      if (odgovor.greska) {
        alert(odgovor.poruka); // Prikaži grešku ako dođe do problema
        return;
      }
      setKlubovi(odgovor.poruka); 
    }




    useEffect(()=>{
      console.log('Šifra igrača:', routeParams.sifra);
        dohvatiIgrace();
        dohvatiKlubove();
    },[]);

    async function promjena(e){
        showLoading();
        const odgovor = await IgracService.promjena(routeParams.sifra,e);
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.IGRAC_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
          ime: podaci.get('ime'),
          prezime: podaci.get('prezime'),
          klubSifra: parseInt(klubSifra),
          datumRodjenja: podaci.get('datumRodjenja'),
          pozicija: podaci.get('pozicija'),
          brojDresa: parseInt(podaci.get('brojDresa')),
        });

    }

    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }
      function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setSlikaZaCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }
    
      async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;
        const odgovor = await IgracService.postaviSliku(routeParams.sifra, {Base64: base64.replace('data:image/png;base64,', '')});
        hideLoading();
        if(odgovor.greska){
          alert(odgovor.podaci);
        }
        setTrenutnaSlika(slikaZaServer);
      }    

    return(
        <>
            Promjena Igraca
            <Row>
        <Col key='1' sm={12} lg={6} md={6}>
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={igrac.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required  defaultValue={igrac.prezime}/>
                </Form.Group>

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

                <Form.Group controlId="datumRodjenja">
                  <Form.Label>Datum rođenja</Form.Label>
                  <Form.Control type="date" name="datumRodjenja" required defaultValue={igrac.datumRodjenja} />
                </Form.Group>

                <Form.Group controlId="pozicija">
                  <Form.Label>Pozicija</Form.Label>
                  <Form.Control type="text" name="pozicija" required defaultValue={igrac.pozicija} />
                </Form.Group>

                <Form.Group controlId="brojDresa">
                  <Form.Label>Broj dresa</Form.Label>
                  <Form.Control type="number" name="brojDresa" required min={1} defaultValue={igrac.brojDresa} />
                </Form.Group>


                <Row className='mb-4'>
              <Col key='1' sm={12} lg={6} md={12}>
                <p className='form-label'>Trenutna slika</p>
                <Image
                  //za lokalni development
                  //src={'https://edunovawp1.eu/' + trenutnaSlika}
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <p className='form-label'>Nova slika</p>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.IGRAC_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni igraca
                    </Button>
                    </Col>
                </Row>
            </Form> 
            </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <input className='mb-3' type='file' onChange={onChangeImage} />
              <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
        </Col>
      </Row>
        </>
    )
}