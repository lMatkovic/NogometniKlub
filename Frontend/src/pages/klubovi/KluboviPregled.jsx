import { useEffect } from "react"
import KlubService from "../../services/KlubService"


export default function KluboviPregled(){
    
    async function dohvatiKlubove(){
        await KlubService.get()
    }

    useEffect(()=>{
        dohvatiKlubove()
    },[])
    
    
    
    return (
        <>
        Ovdje će doći pregled klubova
        </>
    )
}