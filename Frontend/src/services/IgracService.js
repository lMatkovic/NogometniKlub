import { HttpService } from "./HttpService"



async function get(){
    return await HttpService.get('/Igrac')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}


async function getBySifra(sifra){
    return await HttpService.get('/Igrac/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji Igrac!'}
    })
}


async function obrisi(sifra) {
    return await HttpService.delete('/Igrac/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Igrac se ne može obrisati!'}
    })
}


async function dodaj(Igrac) {
    return await HttpService.post('/Igrac',Igrac)
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
                return {greska: true, poruka: 'Igrac se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Igrac) {
    return await HttpService.put('/Igrac/' + sifra,Igrac)
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
                return {greska: true, poruka: 'Igrac se ne može promjeniti!'}
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