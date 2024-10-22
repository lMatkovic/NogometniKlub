import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../services/IgracService"; // primjetite promjenu naziva
import { RouteNames } from "../../constants";


export default function IgracPregled() {
    const [igraci, setIgraci] = useState([]); // Inicijalizirano kao prazan niz
    let navigate = useNavigate(); 
    
    // Funkcija za dohvaćanje igrača
    async function dohvatiIgrace() {
        try {
            const odgovor = await Service.get();
            setIgraci(odgovor);
        } catch (e) {
            console.log(e);
        }
    }
    
    // Funkcija za brisanje igrača
    async function obrisiIgraca(sifra) {
        try {
            const odgovor = await Service.obrisi(sifra);
            if (odgovor.greska) {
                alert(odgovor.poruka);
                return;
            }
            dohvatiIgrace(); // Ponovno dohvaćanje igrača nakon brisanja
        } catch (e) {
            console.log(e);
        }
    }
    
    // useEffect za dohvaćanje igrača kada se komponenta učita
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
                                    onClick={() => obrisiIgraca(entitet.sifra)} // Popravljen naziv funkcije
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
