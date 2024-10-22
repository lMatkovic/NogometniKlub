import { useEffect, useState } from "react"
import KlubService from "../../services/KlubService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { FaEdit, FaTrash } from "react-icons/fa";


export default function KluboviPregled(){


    const navigate = useNavigate()

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
                        <td className="sredina">
                            <Button
                                    variant="primary"
                                    onClick={() => { navigate(`/klubovi/${klub.sifra}`); }}
                                >
                                    <FaEdit size={25} />
                            </Button>

                                &nbsp;&nbsp;&nbsp;
                                
                            <Button
                                    variant="danger"
                                    onClick={() => obrisi(klub.sifra)} 
                                >
                                    <FaTrash size={25} />
                            </Button>
                            </td>

                    </tr>

                ))}
            </tbody>

        </Table>
        </>
    )
}