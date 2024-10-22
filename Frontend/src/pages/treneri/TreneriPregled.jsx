import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../services/TrenerService"; 
import { RouteNames } from "../../constants";

export default function TreneriPregled(){
    const [treneri, setTreneri] = useState();
    let navigate = useNavigate(); 

    async function dohvatiTrenere(){
        await Service.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setTreneri(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    async function obrisiTrenera(sifra) {
        const odgovor = await Service.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiTrenere();
    }

    useEffect(()=>{
        dohvatiTrenere();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RouteNames.TRENER_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ime</th>
                        <th>Prezime</th>
                        <th>Klub</th>
                        <th>Nacionalnost</th>
                        <th>Iskustvo</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {treneri && treneri.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.ime}</td>
                            <td>{entitet.prezime}</td>
                            <td>{entitet.klubNaziv}</td>  
                            <td>{entitet.nacionalnost}</td>
                            <td>{entitet.iskustvo}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/trener/${entitet.sifra}`)}}

                                        >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                                
                                    &nbsp;&nbsp;&nbsp;

                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiTrenera(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}