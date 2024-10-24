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
import IgraciPregled from './pages/igraci/IgraciPregled';
import IgraciDodaj from './pages/Igraci/IgraciDodaj';
import IgraciPromjena from './pages/igraci/IgraciPromjena';
import TreneriPregled from './pages/treneri/TreneriPregled';
import TreneriDodaj from './pages/treneri/TreneriDodaj';
import TreneriPromjena from './pages/treneri/TreneriPromjena';
import UtakmicePregled from './pages/utakmice/UtakmicePregled';
import UtakmiceDodaj from './pages/utakmice/UtakmiceDodaj';
import UtakmicePromjena from './pages/utakmice/UtakmicePromjena';











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

        <Route path={RouteNames.IGRAC_PREGLED} element={<IgraciPregled/>} />
        <Route path={RouteNames.IGRAC_NOVI} element={<IgraciDodaj/>} />
        <Route path={RouteNames.IGRAC_PROMJENA} element={<IgraciPromjena/>} />

        <Route path={RouteNames.TRENER_PREGLED} element={<TreneriPregled/>} />
        <Route path={RouteNames.TRENER_NOVI} element={<TreneriDodaj/>} />
        <Route path={RouteNames.TRENER_PROMJENA} element={<TreneriPromjena/>} />

        <Route path={RouteNames.UTAKMICA_PREGLED} element={<UtakmicePregled/>} />
        <Route path={RouteNames.UTAKMICA_NOVI} element={<UtakmiceDodaj/>} />
        <Route path={RouteNames.UTAKMICA_PROMJENA} element={<UtakmicePromjena/>} />
            
        
    
         

      </Routes>
      <hr/>
      &copy; Luka
    </Container>
    
    </>
  );
}

export default App
