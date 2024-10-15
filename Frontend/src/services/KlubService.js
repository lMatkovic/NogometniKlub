import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Klub')
    .then((odgovor)=>{
       // console.log(odgovor.data)
       // console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
       // console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja klubova'}
    })
}

async function  dodaj(klub){
    return await HttpService.post('/Klub',klub)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja kluba'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Klub/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja kluba'}   
    })
}






export default {
    get,
    brisanje,
    dodaj
}