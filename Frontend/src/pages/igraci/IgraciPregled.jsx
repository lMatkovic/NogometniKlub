import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../services/IgracService"; 
import { RouteNames } from "../../constants";


export default function IgracPregled() {
    const [igraci, setIgraci] = useState([]); 
    let navigate = useNavigate(); 
    
   
    async function dohvatiIgrace() {
        try {
            const odgovor = await Service.get();
            setIgraci(odgovor);
        } catch (e) {
            console.log(e);
        }
    }
    
   
    async function obrisiIgraca(sifra) {
        try {
            const odgovor = await Service.obrisi(sifra);
            if (odgovor.greska) {
                alert(odgovor.poruka);
                return;
            }
            dohvatiIgrace(); 
        } catch (e) {
            console.log(e);
        }
    }
    
    
    useEffect(() => {
        dohvatiIgrace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Container>
            <Link to={RouteNames.IGRAC_NOVI} className="btn btn-success siroko">
                <IoIosAdd size={25} />Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Klub</th>
                        <th>Datum Rođenja</th>
                        <th>Pozicija</th>
                        <th>Broj Dresa</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {igraci && igraci.map((entitet, index) => (
                        <tr key={index}>
                            <td>{entitet.ime}</td>
                            <td>{entitet.prezime}</td>
                            <td>{entitet.klubNaziv}</td>
                            <td>{entitet.datumRodjenja}</td>
                            <td>{entitet.pozicija}</td>
                            <td>{entitet.brojDresa}</td>
                            <td className="sredina">
                                <Button
                                    variant="primary"
                                    onClick={() => { navigate(`/igraci/${entitet.sifra}`); }}
                                >
                                    <FaEdit size={25} />
                                </Button>

                                &nbsp;&nbsp;&nbsp;
                                
                                <Button
                                    variant="danger"
                                    onClick={() => obrisiIgraca(entitet.sifra)} 
                                >
                                    <FaTrash size={25} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
