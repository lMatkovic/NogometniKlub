import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import './App.css'
import NavBarNogometniKlub from './components/NavBarNogometniklub';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import KluboviPregled from './pages/klubovi/KluboviPregled';
import KluboviDodaj from './pages/klubovi/KluboviDodaj';
import KluboviPromjena from './pages/klubovi/KluboviPromjena';





function App() {
  

  return (
    <>
    <Container>
      <NavBarNogometniKlub />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>} />

        <Route path={RouteNames.KLUB_PREGLED} element={<KluboviPregled/>} />
        <Route path={RouteNames.KLUB_NOVI} element={<KluboviDodaj/>} />
        <Route path={RouteNames.KLUB_PROMJENA} element={<KluboviPromjena/>} />
        



         

      </Routes>
      <hr/>
      &copy; Luka
    </Container>
    
    </>
  )
}

export default App
