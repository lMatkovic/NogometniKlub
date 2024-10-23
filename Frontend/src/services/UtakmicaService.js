import { HttpService } from "./HttpService"



async function get(){
    return await HttpService.get('/Utakmica')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}


async function getBySifra(sifra){
    return await HttpService.get('/Utakmica/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji Utakmica!'}
    })
}


async function obrisi(sifra) {
    return await HttpService.delete('/Utakmica/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Utakmica se ne može obrisati!'}
    })
}


async function dodaj(Utakmica) {
    return await HttpService.post('/Utakmica',Utakmica)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Utakmica se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Utakmica) {
    return await HttpService.put('/Utakmica/' + sifra,Utakmica)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Utakmica se ne može promjeniti!'}
        }
    })
}
export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}