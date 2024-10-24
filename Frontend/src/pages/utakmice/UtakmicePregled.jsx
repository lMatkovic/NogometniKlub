import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../services/UtakmicaService"; 
import { RouteNames } from "../../constants";

export default function UtakmicePregled(){
    const [utakmice, setUtakmice] = useState();
    let navigate = useNavigate(); 

    async function dohvatiUtakmice(){
        await Service.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setUtakmice(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    async function obrisiUtakmicu(sifra) {
        const odgovor = await Service.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiUtakmice();
    }

    useEffect(()=>{
        dohvatiUtakmice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RouteNames.UTAKMICA_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Lokacija</th>
                        <th>Stadion</th>
                        <th>Domaci klub</th>
                        <th>Gostujuci klub</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {utakmice && utakmice.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.datum}</td>
                            <td>{entitet.lokacija}</td>
                            <td>{entitet.stadion}</td>  
                            <td>{entitet.domaciNaziv}</td>
                            <td>{entitet.gostujuciNaziv}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/utakmice/${entitet.sifra}`)}}

                                        >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                                
                                    &nbsp;&nbsp;&nbsp;

                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiUtakmicu(entitet.sifra)}
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