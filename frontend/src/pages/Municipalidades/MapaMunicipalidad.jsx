import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import L from '../../config/leafletIcons';
import incidentesData from '../../data/incidentes.json';
import HeatmapLayer from "../../components/Municipalidades/HeatmapLayer";
import { useMap } from 'react-leaflet';

const FitBounds = ({ bounds }) => {
    const map = useMap();
  
    useEffect(() => {
      if (bounds && bounds.length > 0) {
        map.fitBounds(bounds);
      }
    }, [map, bounds]);
  
    return null;
};

const MapaMunicipalidad = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(incidentesData);
  }, []);

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  const { incidentes, rutasOptimas, geocercas } = data;

  const geoCerca = geocercas[0].limite;
  const bounds = geoCerca.map(coord => [coord.lat, coord.lng]);

  const puntosHeat = incidentes.map((i) => [
    i.coordenadas.lat,
    i.coordenadas.lng,
    i.reportes / 10
  ]);

  const zonaGuardada = JSON.parse(localStorage.getItem("limitePersonalizado") || "[]");
  const comuna = localStorage.getItem("comunaSeleccionada") || "(no definida)";
  return (
    <div className="w-full h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-2">Comuna: {comuna}</h2>
      </div>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <FitBounds bounds={bounds} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon positions={bounds} pathOptions={{ color: 'blue', fillOpacity: 0.1 }} />
  
        <HeatmapLayer puntos={puntosHeat} />
  
        {zonaGuardada.length > 0 && (
          <Polygon
            positions={zonaGuardada.map(([lng, lat]) => [lat, lng])}
            pathOptions={{ color: 'green', fillOpacity: 0.2 }}
          />
        )}
  
        {incidentes.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.coordenadas.lat, inc.coordenadas.lng]}
            icon={new L.Icon.Default()}
          >
            <Popup>
              <div>
                <h3>Tipo: {inc.tipo}</h3>
                <p>Fecha: {inc.fecha}</p>
                <p>Reportes: {inc.reportes}</p>
                <p>Validado: {inc.validado ? 'Sí' : 'No'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
  
        {rutasOptimas.map((ruta) => (
          <Polyline
            key={ruta.id}
            positions={ruta.puntos.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: 'red' }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaMunicipalidad;
