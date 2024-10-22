import { HttpService } from "./HttpService"



async function get(){
    return await HttpService.get('/Trener')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}


async function getBySifra(sifra){
    return await HttpService.get('/Trener/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji Trener!'}
    })
}


async function obrisi(sifra) {
    return await HttpService.delete('/Trener/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Trener se ne može obrisati!'}
    })
}


async function dodaj(Trener) {
    return await HttpService.post('/Trener',Trener)
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
                return {greska: true, poruka: 'Trener se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Trener) {
    return await HttpService.put('/Trener/' + sifra,Trener)
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
                return {greska: true, poruka: 'Trener se ne može promjeniti!'}
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