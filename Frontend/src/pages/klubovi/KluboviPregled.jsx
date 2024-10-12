import { useEffect, useState } from "react"
import KlubService from "../../services/KlubService"
import { Table } from "react-bootstrap"


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
    
    
    
    return (
        <>
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
                        <td>Akcija</td>

                    </tr>

                ))}
            </tbody>

        </Table>
        </>
    )
}