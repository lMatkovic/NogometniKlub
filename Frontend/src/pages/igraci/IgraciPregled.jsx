import { Button, Card, Col, Form, Pagination, Row, Spinner } from "react-bootstrap";
import IgracService from "../../services/IgracService";
import { useEffect, useState } from "react";
import { APP_URL, RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import nepoznato from '../../assets/nepoznato.png'; 
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";

export default function IgraciPregled() {
    const [igraci, setIgraci] = useState();
    const [selectedIgraci, setSelectedIgraci] = useState([]);
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiIgrace() {
        setIsLoading(true);
        showLoading();
        const odgovor = await IgracService.getStranicenje(stranica, uvjet);
        hideLoading();
        setIsLoading(false);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        if (odgovor.poruka.length === 0) {
            setStranica(stranica - 1);
            return;
        }
        setIgraci(odgovor.poruka);
    }

    useEffect(() => {
        dohvatiIgrace();
    }, [stranica, uvjet]);

    async function obrisiAsync(sifra) {
        showLoading();
        const odgovor = await IgracService.obrisi(sifra);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiIgrace();
    }

    async function obrisiOdabraneIgrace() {
        showLoading();
        for (let sifra of selectedIgraci) {
            await IgracService.obrisi(sifra);
        }
        setSelectedIgraci([]);
        hideLoading();
        dohvatiIgrace();
    }

    function slika(igrac) {
        return igrac.slika ? `${APP_URL}${igrac.slika}?${Date.now()}` : nepoznato;
    }

    function promjeniUvjet(e) {
        if (e.nativeEvent.key === "Enter") {
            setStranica(1);
            setUvjet(e.target.value);
            setIgraci([]);
        }
    }

    function handleSelectIgrac(sifra) {
        setSelectedIgraci((prevSelected) =>
            prevSelected.includes(sifra)
                ? prevSelected.filter((id) => id !== sifra)
                : [...prevSelected, sifra]
        );
    }

    function handleSelectAll(e) {
        if (e.target.checked) {
            setSelectedIgraci(igraci.map((p) => p.sifra));
        } else {
            setSelectedIgraci([]);
        }
    }

    function povecajStranicu() {
        setStranica(stranica + 1);
    }

    function smanjiStranicu() {
        if (stranica > 1) {
            setStranica(stranica - 1);
        }
    }

    return (
        <>
            <Row className="mb-3">
                <Col sm={12} lg={4} md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Dio imena i prezimena [Enter]"
                        maxLength={255}
                        onKeyUp={promjeniUvjet}
                    />
                </Col>
                <Col sm={12} lg={4} md={4}>
                    {igraci && igraci.length > 0 && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination size="lg">
                                <Pagination.Prev onClick={smanjiStranicu} />
                                <Pagination.Item disabled>{stranica}</Pagination.Item>
                                <Pagination.Next onClick={povecajStranicu} />
                            </Pagination>
                        </div>
                    )}
                </Col>
                <Col sm={12} lg={4} md={4}>
                    <Link to={RouteNames.IGRAC_NOVI} className="btn btn-success gumb">
                        <IoIosAdd size={25} /> Dodaj
                    </Link>
                </Col>
            </Row>
            
            {isLoading && (
                <div style={{ display: "flex", justifyContent: "center", margin: '1rem 0' }}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}
            
            {!isLoading && igraci && igraci.length > 0 && (
                <>
                    <Row className="align-items-center">
                        <Col>
                            <Form.Check 
                                type="checkbox" 
                                label="Select All" 
                                onChange={handleSelectAll} 
                                checked={selectedIgraci.length === igraci.length} 
                            />
                        </Col>
                        {selectedIgraci.length > 0 && (
                            <Button variant="danger" onClick={obrisiOdabraneIgrace} className="my-3">
                                Obriši označene ({selectedIgraci.length})
                            </Button>
                        )}
                    </Row>
                    
                    <Row>
                        {igraci.map((p) => (
                            <Col key={p.sifra} sm={12} lg={3} md={3}>
                                <Card 
                                    style={{ 
                                        marginTop: '1rem',
                                        border: selectedIgraci.includes(p.sifra) ? '3px solid red' : '1px solid #ddd'
                                    }}
                                >
                                    <Card.Img variant="top" src={slika(p)} className="slika" />
                                    <Card.Body>
                                        <Card.Title>{p.ime} {p.prezime}</Card.Title>
                                        <Row>
                                            <Col>
                                                <Link className="btn btn-primary gumb" to={`/igraci/${p.sifra}`}>
                                                    <FaEdit />
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Button variant="danger" className="gumb" onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    obrisiAsync(p.sifra);
                                                }}>
                                                    <FaTrash />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    
                    <div style={{ display: "flex", justifyContent: "center", marginTop: '1rem' }}>
                        <Pagination size="lg">
                            <Pagination.Prev onClick={smanjiStranicu} />
                            <Pagination.Item disabled>{stranica}</Pagination.Item>
                            <Pagination.Next onClick={povecajStranicu} />
                        </Pagination>
                    </div>
                </>
            )}
        </>
    );
}
