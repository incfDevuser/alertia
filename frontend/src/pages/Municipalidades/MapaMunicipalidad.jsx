import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import L from '../../config/leafletIcons';
import { generateIncidentes } from '../../data/generateTestData';
import { generateRutasOptimas } from '../../data/generateRoutes';
import HeatmapLayer from "../../components/Municipalidades/HeatmapLayer";
import { useMap } from 'react-leaflet';
import { Link } from "react-router-dom";

const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
};

const isPointInPolygon = (point, polygon) => {
  const x = point[1], y = point[0];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

const MapaMunicipalidad = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const zonaGuardada = JSON.parse(localStorage.getItem("limitePersonalizado") || "[]");
    const comuna = localStorage.getItem("comunaSeleccionada") || "(no definida)";
    const geocercas = [
      {
        id: "geo001",
        nombre: "Providencia",
        limite: [
          { lat: -33.432, lng: -70.630 },
          { lat: -33.432, lng: -70.610 },
          { lat: -33.418, lng: -70.610 },
          { lat: -33.418, lng: -70.630 },
          { lat: -33.432, lng: -70.630 },
        ],
      },
    ];

    const bounds = zonaGuardada.length > 0
      ? zonaGuardada.map(([lng, lat]) => [lat, lng])
      : geocercas[0].limite.map(coord => [coord.lat, coord.lng]);

    console.log("Zona guardada:", zonaGuardada);
    console.log("Bounds calculados:", bounds);

    let incidentes = JSON.parse(localStorage.getItem("incidentes")) || [];
    if (!incidentes.length) {
      incidentes = generateIncidentes(bounds, 20);
      localStorage.setItem("incidentes", JSON.stringify(incidentes));
    }

    const incidentesFiltrados = incidentes.filter((inc) =>
      isPointInPolygon([inc.coordenadas.lat, inc.coordenadas.lng], zonaGuardada)
    );

    console.log("Incidentes generados:", incidentes);
    console.log("Incidentes filtrados:", incidentesFiltrados);

    const rutasOptimas = generateRutasOptimas(incidentesFiltrados);

    setData({ incidentes, incidentesFiltrados, rutasOptimas, geocercas, comuna, bounds, zonaGuardada });
  }, []);

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  const { incidentesFiltrados, rutasOptimas, comuna, bounds, zonaGuardada } = data;

  const puntosHeat = incidentesFiltrados.map((i) => [
    i.coordenadas.lat,
    i.coordenadas.lng,
    i.reportes / 10,
  ]);

  return (
    <div className="w-full h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-2">Comuna: {comuna}</h2>
        <Link
          to="/reportes"
          state={{ incidentesFiltrados }}
          className="text-blue-500 underline"
        >
          Ver Reportes
        </Link>
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
        <HeatmapLayer puntos={puntosHeat} />
        {zonaGuardada.length > 0 && (
          <Polygon
            positions={zonaGuardada.map(([lng, lat]) => [lat, lng])}
            pathOptions={{ color: 'green', fillOpacity: 0.2 }}
          />
        )}
        {incidentesFiltrados.map((inc) => (
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