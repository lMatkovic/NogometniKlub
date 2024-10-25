import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { APP_URL, RouteNames } from '../constants';


export default function NavBarNogometniKlub(){
    
    const navigate = useNavigate()
    

    function OpenSwaggerURL(){
        window.open(APP_URL + "/swagger/index.html", "_blank")
      }


    
    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand className='ruka'
                onClick={()=>navigate(RouteNames.HOME)}
                >Nogometni Klub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link  onClick={()=>OpenSwaggerURL()} >Swagger</Nav.Link>
                    <NavDropdown title="Programi" id="basic-nav-dropdown">
                        
                        <NavDropdown.Item 
                        onClick={()=>navigate(RouteNames.KLUB_PREGLED)}
                        >Klubovi</NavDropdown.Item>
                        
                        <NavDropdown.Item 
                        onClick={()=>navigate(RouteNames.IGRAC_PREGLED)}
                        >Igraci</NavDropdown.Item>

                        <NavDropdown.Item 
                        onClick={()=>navigate(RouteNames.TRENER_PREGLED)}
                        >Treneri</NavDropdown.Item>

                        <NavDropdown.Item 
                        onClick={()=>navigate(RouteNames.UTAKMICA_PREGLED)}
                        >Utakmice</NavDropdown.Item>

                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>

        </>
    )
}