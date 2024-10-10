import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Klub')
    .then((odgovor)=>{
        console.log(odgovor.data)
        console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja klubova'}
    })
}

export default {
    get
}