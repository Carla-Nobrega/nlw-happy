import React from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css'
import mapIcon from "../utils/mapIcon";
import { useEffect, useState } from 'react';
import api from '../services/api';

interface Orphanage
{
    id: number;
    name: string;
    latitude: number;
    longitude:  number;
}

function OrphanagesMap()
{
    //Salva o estado da variavel
    //lista do tipo de array e função que atualiza essa lista
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    //Primeiro parâmetro qual função eu vou executar
    //Segundo Parametro é quando eu vou executar a ação
    //Quando as variaveis do array forem alteradas a função é executada
    //Se passar o array vazio a função é executada apenas no inicio
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span> SP</span>
                </footer>
            </aside>
            
            <Map
          center={[-23.6248442, -46.5824175]}
          zoom={14}
          style={{ width: '100%', height: '100%' }}>

          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            
            {orphanages.map(orphanage => {
                return (
                    <Marker key= {orphanage.id}
                            icon={mapIcon} 
                            position = {[orphanage.latitude, orphanage.longitude]}>
               
                <Popup closeButton={false} minWidth={248} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                </Link>

                </Popup>

            </Marker>
                )
            })}


        </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#FFF"></FiPlus>
            </Link>

        </div>
    )
}

export default OrphanagesMap;