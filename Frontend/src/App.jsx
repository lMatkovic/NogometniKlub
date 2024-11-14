import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEdunova from './components/NavBarNogometniKlub'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import KluboviPregled from './pages/klubovi/KluboviPregled'
import KluboviDodaj from './pages/klubovi/KluboviDodaj'
import KluboviPromjena from './pages/klubovi/KluboviPromjena'
import { Container } from 'react-bootstrap'
import IgraciPregled from './pages/igraci/IgraciPregled'
import IgraciDodaj from './pages/Igraci/IgraciDodaj'
import IgraciPromjena from './pages/igraci/IgraciPromjena'
import TreneriPregled from './pages/treneri/TreneriPregled'
import TreneriDodaj from './pages/treneri/TreneriDodaj'
import TreneriPromjena from './pages/treneri/TreneriPromjena'
import UtakmicePregled from './pages/utakmice/UtakmicePregled'
import UtakmiceDodaj from './pages/utakmice/UtakmiceDodaj'
import UtakmicePromjena from './pages/utakmice/UtakmicePromjena'

import LoadingSpinner from './components/LoadingSpinner'
import Login from "./pages/Login"
import useAuth from "./hooks/useAuth"
import NadzornaPloca from './pages/NadzornaPloca'
import Stranicazapomoc from './pages/Stranicazapomoc'
















function App() {

  const { isLoggedIn } = useAuth();
  //const { errors, prikaziErrorModal, sakrijError } = useError();

  function godina(){
    const pocenta = 2024;
    const trenutna = new Date().getFullYear();
    if(pocenta===trenutna){
      return trenutna;
    }
    return pocenta + ' - ' + trenutna;
  }
  
  

  return (
    <>
    <LoadingSpinner />
    <Container className='aplikacija'>
      <NavBarEdunova />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />
        {isLoggedIn ? (
      <>
        <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />


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

        <Route path={RouteNames.STRANICA_ZA_POMOC} element={<Stranicazapomoc/>} />
        </>
        ) : (
          <>
            <Route path={RouteNames.LOGIN} element={<Login />} />
          </>
        )}
        </Routes>
      </Container>
      <Container>
        <hr />
        Luka &copy; {godina()}
      </Container>
    </>
  )
}

export default App