import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';


export default function NavBarNogometniKlub(){
    
    const navigate = useNavigate()
    
    
    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">

                <Navbar.Brand className='ruka'
                onClick={()=>navigate(RouteNames.HOME)}
                >NogometniKlubAPP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="https://lukam1-001-site1.dtempurl.com/swagger/index.html"
                    target='_blank'>Swagger</Nav.Link>
                    <NavDropdown title="Programi" id="basic-nav-dropdown">
                        <NavDropdown.Item 
                        
                        onClick={()=>navigate(RouteNames.KLUB_PREGLED)}

                        >Klubovi</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                        Igraci
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Treneri</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">
                        Utakmice
                        </NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>

        </>
    )
}