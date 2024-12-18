import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Klub')
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
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


async function  promjena(sifra,klub){
    return await HttpService.put('/Klub/' + sifra,klub)
    .then(()=>{
        return {greska: false, poruka: 'Promjenjeno'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod promjene kluba'}   
    })
}


async function getBySifra(sifra){
    return await HttpService.get('/Klub/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja kluba s šifrom '
        +sifra}
    })
}


async function dostupniKlubovi(){
    return await HttpService.get('/Pocetna/DostupniKlubovi')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function grafKluba(){
    return await HttpService.get('/Klub/GrafKluba')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}





export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
    dostupniKlubovi,
    grafKluba
    
    
    
}