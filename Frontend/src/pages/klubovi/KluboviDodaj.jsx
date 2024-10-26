import KlubService from "../../services/KlubService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useLoading from "../../hooks/useLoading";


export default function KluboviDodaj(){

    const navigate = useNavigate()
    const { showLoading, hideLoading } = useLoading();

   
    async function dodaj(klub) {
        //console.log(klub)
        //console.log(JSON.stringify(klub))
        showLoading();
        const odgovor = await KlubService.dodaj(klub)
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.KLUB_PREGLED)
    }

    function obradiSubmit(e){ 
        e.preventDefault(); 
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        dodaj({
            naziv: podaci.get('naziv'),
            osnovan: parseInt(podaci.get('osnovan')),
            stadion: podaci.get('stadion'),
            predsjednik: podaci.get('predsjednik'),
            drzava: podaci.get('drzava'),
            liga: podaci.get('liga')
        })
    }

   

    
    
    return(
        <>
        <h2>Dodavanje novog kluba</h2>
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>
            <Form.Group controlId="osnovan">
                <Form.Label>Osnovan</Form.Label>
                <Form.Control type="number" min={1857} max={2024} name="osnovan" required />
            </Form.Group>
            <Form.Group controlId="stadion">
                <Form.Label>Stadion</Form.Label>
                <Form.Control type="text" name="stadion"  />
            </Form.Group>
            <Form.Group controlId="predsjednik">
                <Form.Label>Predsjednik</Form.Label>
                <Form.Control type="text" name="predsjednik" />
            </Form.Group>
            <Form.Group controlId="drzava">
                <Form.Label>Država</Form.Label>
                <Form.Control type="text" name="drzava" />
            </Form.Group>
            <Form.Group controlId="liga">
                <Form.Label>Liga</Form.Label>
                <Form.Control type="text" name="liga" />
            </Form.Group>
        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.KLUB_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj klub</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}