import KlubService from "../../services/KlubService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import { useEffect } from "react"
import { useState } from "react";



export default function KluboviPromjena(){
    
    const [klub,setKlub] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    async function dohvatiKlub(){
        const odgovor = await KlubService.getBySifra(routeParams.sifra)
        if(odgovor.greska){
          alert(odgovor.poruka)
          return
        }
          setKlub(odgovor.poruka)
      }



    useEffect(()=>{
        dohvatiKlub();
    },[])

    async function promjena(klub) {
        const odgovor = await KlubService.promjena(routeParams.sifra,klub)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.KLUB_PREGLED)
    }

    function obradiSubmit(e){ 
        e.preventDefault(); 
        let podaci = new FormData(e.target)
        promjena({
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
        Promjena kluba
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required
                defaultValue={klub.naziv} />
            </Form.Group>
            <Form.Group controlId="osnovan">
                <Form.Label>Osnovan</Form.Label>
                <Form.Control type="number" min={1857} max={2024} name="osnovan" required
                defaultValue={klub.osnovan} />
            </Form.Group>
            <Form.Group controlId="stadion">
                <Form.Label>Stadion</Form.Label>
                <Form.Control type="text" name="stadion" 
                defaultValue={klub.stadion} />
            </Form.Group>
            <Form.Group controlId="predsjednik">
                <Form.Label>Predsjednik</Form.Label>
                <Form.Control type="text" name="predsjednik"
                defaultValue={klub.predsjednik} />
            </Form.Group>
            <Form.Group controlId="drzava">
                <Form.Label>Država</Form.Label>
                <Form.Control type="text" name="drzava" 
                defaultValue={klub.drzava}/>
            </Form.Group>
            <Form.Group controlId="liga">
                <Form.Label>Liga</Form.Label>
                <Form.Control type="text" name="liga" 
                defaultValue={klub.liga}/>
            </Form.Group>
        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.KLUB_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni klub</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}