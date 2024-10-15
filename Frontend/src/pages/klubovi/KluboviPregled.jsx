import { useEffect, useState } from "react"
import KlubService from "../../services/KlubService"
import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function KluboviPregled(){

    const[klubovi, setKlubovi] = useState()
    
    async function dohvatiKlubove(){
      const odgovor = await KlubService.get()
      if(odgovor.greska){
        alert(odgovor.poruka)
        return
      }
        setKlubovi(odgovor.poruka)
    }
    
    
    useEffect(()=>{
        dohvatiKlubove()
    },[])
    
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeKluba(sifra)
    }

    async function brisanjeKluba(sifra) {
        
        const odgovor = await KlubService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiKlubove();
    }


    
    return (
        <>
        <Link to={RouteNames.KLUB_NOVI}
        className="btn btn-success siroko">Dodaj novi klub</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Osnovan</th>
                    <th>Stadion</th>
                    <th>Predsjednik</th>
                    <th>Država</th>
                    <th>Liga</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {klubovi && klubovi.map((klub,index)=>(
                    <tr key={index}>
                        <td>
                            {klub.naziv}
                        </td>
                        <td className="sredina" > 
                            {klub.osnovan}
                        </td>
                        <td>
                            {klub.stadion}
                        </td>
                        <td>
                            {klub.predsjednik}
                        </td>
                        <td>
                            {klub.drzava}
                        </td>
                        <td>
                            {klub.liga}
                        </td>
                        <td>
                            <Button
                            variant='danger'
                            onClick ={()=>obrisi(klub.sifra)}
                            >

                                Obriši
                            </Button>
                            
                        </td>

                    </tr>

                ))}
            </tbody>

        </Table>
        </>
    )
}