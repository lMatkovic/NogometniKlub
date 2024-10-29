import { useEffect, useState } from "react";
import {  Col, Row } from "react-bootstrap";
import KlubService from "../services/KlubService";
import IgracService from "../services/IgracService";
import useLoading from "../hooks/useLoading";
import CountUp from "react-countup";

export default function Pocetna(){
    
    const { showLoading, hideLoading } = useLoading();

    const [igraca, setIgraca] = useState(0);
    const [klubovi, setKlubovi] = useState([]);

    async function dohvatiKlubove() {
        
        await KlubService.dostupniKlubovi()
        .then((odgovor)=>{
            setKlubovi(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    async function dohvatiBrojIgraca() {
        await IgracService.Ukupnoigraca()
        .then((odgovor)=>{
            setIgraca(odgovor.poruka);
        })
        .catch((e)=>{console.log(e)});
    }


    async function ucitajPodatke() {
        showLoading();
        await dohvatiKlubove();
        await dohvatiBrojIgraca();
        hideLoading();
      }


    useEffect(()=>{
        ucitajPodatke()
    },[]);
     
    
    
    return (

        <>
         <Row>
           
           <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
           <h2>Svi Klubovi:</h2>
           <ul>
           &nbsp;&nbsp;&nbsp;

           {klubovi && klubovi.map((klub,index)=>(
                   <li key={index}>{klub.naziv}</li>
                   
           ))}
           </ul>
           </Col>
           <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
           <h2>Ukupan broj igrača:</h2>
           <div className="brojIgraca">
           <CountUp
           start={0}
           end={igraca}
           duration={10}
           separator="."></CountUp>
           </div>
           
           </Col>
       </Row>
        
        </>
    )
}