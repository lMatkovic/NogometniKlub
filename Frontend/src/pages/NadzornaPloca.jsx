import { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import Service from '../services/KlubService';
import useLoading from '../hooks/useLoading';
import axios from "axios";
import IgracService from "../services/IgracService";

export default function NadzornaPloca() {
  const [podaci, setPodaci] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();

  async function getPodaci() {
    showLoading();
    setIsChartLoading(true);
    try {
      const odgovor = await Service.grafKluba();
      setPodaci(odgovor.map((klub) => {
        return {
          y: klub.ukupnoIgraca,
          name: klub.nazivKluba,
        };
      }));
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      hideLoading();
      setIsChartLoading(false);
    }
  }

  useEffect(() => {
    getPodaci();
  }, []);

  async function dodajIgraca(e) {
    const fn = e.player.firstname; 
    const ln = e.player.lastname;   

    const klubovi = [
        { naziv: "FC Barcelona", sifra: 1 }, 
        { naziv: "Real Madrid", sifra: 2 }, 
        { naziv: "Manchester United", sifra: 3 },  
        { naziv: "Bayern Munich", sifra: 4 } 
    ];

    const pozicije = ["Napadač", "Srednji vezni", "Branič", "Golman"];
    
    const randomKlubIndex = Math.floor(Math.random() * klubovi.length);
    const klub = klubovi[randomKlubIndex].naziv;
    const klubSifra = klubovi[randomKlubIndex].sifra; 
    const pozicija = pozicije[Math.floor(Math.random() * pozicije.length)];

    const randomYear = Math.floor(Math.random() * (2005 - 1980)) + 1980; 
    const randomMonth = Math.floor(Math.random() * 12) + 1; 
    const randomDay = Math.floor(Math.random() * 28) + 1; 
    const datumRodjenja = `${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;

    if (fn != null && ln != null) {
        const odgovor = await IgracService.dodaj({
            ime: fn,
            prezime: ln,
            datumRodjenja: datumRodjenja,
            pozicija: pozicija,
            brojDresa: Math.floor(Math.random() * 99) + 1, 
            klub: klub,
            klubSifra: klubSifra 
        });
        
        if (odgovor.greska) {
            alert(odgovor.poruka);
        }
        return !odgovor.greska;  
    }
    return false;  
}

async function odradi(e) { 
    e.preventDefault(); 
    showLoading();
    
    const service = axios.create({
        baseURL: "https://v3.football.api-sports.io",
        headers: {
            'x-rapidapi-key': '678191895867cfb9086975476552d94a',
            'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
        }
    });

    let dodanoIgraca = 0; 

    try {
        const odgovor = await service.get('/players/profiles');
        
        const promises = odgovor.data.response.map(async (player) => {
            const uspesnoDodano = await dodajIgraca(player);
            if (uspesnoDodano) dodanoIgraca++; 
        });

        await Promise.all(promises); 
        alert(`Ukupno dodano igrača: ${dodanoIgraca}`); 
    } catch (error) {
        console.error(error); 
        alert('Dogodila se pogreška prilikom dodavanja igrača.');
    } finally {
        hideLoading();
    }
}

return (
    <Container className='mt-4'>
        <Form onSubmit={odradi}>
            <Button type="submit">Dodaj igrače preko API</Button>
        </Form>
        {isChartLoading ? (
            <div className="text-center mt-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) : (
            podaci.length > 0 && (
                <PieChart
                    highcharts={Highcharts}
                    options={{
                        ...fixedOptions,
                        series: [
                            {
                                name: 'Igraci',
                                colorByPoint: true,
                                data: podaci,
                            },
                        ],
                    }}
                />
            )
        )}
    </Container>
);
}

const fixedOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
    },
    title: {
        text: 'Postotak igraca po klubu',
        align: 'left',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
        enabled: false,
        point: {
            valueSuffix: '%',
        },
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
        },
    },
};
