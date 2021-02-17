import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import firebase from '../services/firebase'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

interface Orphanage {
  key: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    let db_id = firebase.database().ref('/orphanage');
    db_id.on('value', snapshot => {
      const data: object =  snapshot.val()
      let dataArray = Object.values(data)
      setOrphanages(dataArray);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estão esperando a sua visita {':)'}</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paul</span>
        </footer>
      </aside>

      <Map
        center={[-27.2092052, -49.6401092]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> */}

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.key}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.key}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;
