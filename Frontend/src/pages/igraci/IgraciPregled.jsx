import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import IgracService from "../../services/IgracService";
import { useEffect, useState } from "react";
import { APP_URL, RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import nepoznato from '../../assets/nepoznato.png'; 
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";



export default function IgraciPregled(){

    const[igraci,setIgraci] = useState();
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');
    const { showLoading, hideLoading } = useLoading();



    async function dohvatiIgrace() {
        showLoading();
        const odgovor = await IgracService.getStranicenje(stranica,uvjet);
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka);
            
            return;
        }
        if(odgovor.poruka.length==0){
            setStranica(stranica-1);
            return;
        }
        setIgraci(odgovor.poruka);
    }

    // npm run lint
    // javlja upozorenje
    // 28:7  warning  React Hook useEffect has a missing dependency: 'dohvatie'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

    useEffect(()=>{
        dohvatiIgrace();
    },[stranica, uvjet]);



   

    async function obrisiAsync(sifra) {
        showLoading();
        const odgovor = await IgracService.obrisi(sifra);
        hideLoading();
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiIgrace();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    function slika(igrac){
        if(igrac.slika!=null){
            return APP_URL + igrac.slika+ `?${Date.now()}`;
        }
        return nepoznato;
    }

    function promjeniUvjet(e) {
        if(e.nativeEvent.key == "Enter"){
            console.log('Enter')
            setStranica(1);
            setUvjet(e.nativeEvent.srcElement.value);
            setIgraci([]);
        }
    }

    function povecajStranicu() {
        setStranica(stranica + 1);
      }
    
      function smanjiStranicu() {
        if(stranica==1){
            return;
        }
        setStranica(stranica - 1);
      }


    return(
        <>
           <Row>
                <Col key={1} sm={12} lg={4} md={4}>
                    <Form.Control
                    type='text'
                    name='trazilica'
                    placeholder='Dio imena i prezimena [Enter]'
                    maxLength={255}
                    defaultValue=''
                    onKeyUp={promjeniUvjet}
                    />
                </Col>
                <Col key={2} sm={12} lg={4} md={4}>
                    {igraci && igraci.length > 0 && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination size="lg">
                                <Pagination.Prev onClick={smanjiStranicu} />
                                <Pagination.Item disabled>{stranica}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={povecajStranicu}
                                />
                            </Pagination>
                        </div>
                    )}
                </Col>
                <Col key={3} sm={12} lg={4} md={4}>
                    <Link to={RouteNames.IGRAC_NOVI} className="btn btn-success gumb">
                        <IoIosAdd
                        size={25}
                        /> Dodaj
                    </Link>
                </Col>
            </Row>
            
                
            <Row>
                
            { igraci && igraci.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>
              <Card style={{ marginTop: '1rem' }}>
              <Card.Img variant="top" src={slika(p)} className="slika"/>
                <Card.Body>
                  <Card.Title>{p.ime} {p.prezime}</Card.Title>
                  <Card.Text>
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/igraci/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => obrisi(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>
      <hr />
              {igraci && igraci.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                    <Pagination.Prev onClick={smanjiStranicu} />
                    <Pagination.Item disabled>{stranica}</Pagination.Item> 
                    <Pagination.Next
                        onClick={povecajStranicu}
                    />
                    </Pagination>
                </div>
                )}
        </>
    )

}