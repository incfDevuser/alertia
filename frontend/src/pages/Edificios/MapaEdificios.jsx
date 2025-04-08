import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, Circle } from 'react-leaflet';
import L from '../../config/leafletIcons';
import { generateIncidentes } from '../../data/generateTestData';
import { generateRutasOptimas } from '../../data/generateRoutes';
import HeatmapLayer from "../../components/Municipalidades/HeatmapLayer";
import { Link } from "react-router-dom";
import { useMap } from 'react-leaflet';

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

const haversineDistance = (coord1, coord2) => {
  const R = 6371e3;
  const toRad = (value) => (value * Math.PI) / 180;

  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);
  const deltaLat = toRad(coord2.lat - coord1.lat);
  const deltaLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const filterByDateRange = (incidentes, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return incidentes.filter((inc) => {
    const incidentDate = new Date(inc.fecha);
    return incidentDate >= start && incidentDate <= end;
  });
};

const generateHeatZones = (incidentes, center, radius) => {
  return incidentes.filter((inc) => {
    const distance = haversineDistance(center, inc.coordenadas);
    return distance <= radius;
  });
};

const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
};

const MapaEdificios = () => {
  const [data, setData] = useState(null);
  const [radius, setRadius] = useState(500);
  const [startDate, setStartDate] = useState("2025-04-01");
  const [endDate, setEndDate] = useState("2025-04-07");

  useEffect(() => {
    const zonaGuardada = JSON.parse(localStorage.getItem("limiteEdificio") || "[]");
    const edificio = localStorage.getItem("edificioSeleccionado") || "(no definido)";
    const geocercas = [
      {
        id: "geo001",
        nombre: "Edificio Central",
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

    let incidentes = JSON.parse(localStorage.getItem("incidentesEdificios")) || [];
    if (!incidentes.length) {
      incidentes = generateIncidentes(bounds, 20);
      localStorage.setItem("incidentesEdificios", JSON.stringify(incidentes));
    }

    const incidentesFiltrados = incidentes.filter((inc) =>
      isPointInPolygon([inc.coordenadas.lat, inc.coordenadas.lng], zonaGuardada)
    );

    const incidentesPorFecha = filterByDateRange(incidentesFiltrados, startDate, endDate);

    const zonasCalor = generateHeatZones(incidentesPorFecha, { lat: -33.426, lng: -70.62 }, radius);

    const rutasOptimas = generateRutasOptimas(incidentesFiltrados);

    setData({ incidentes, incidentesFiltrados, rutasOptimas, geocercas, edificio, bounds, zonaGuardada, zonasCalor });
  }, [radius, startDate, endDate]);

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  const { incidentesFiltrados, rutasOptimas, edificio, bounds, zonaGuardada, zonasCalor } = data;

  const puntosHeat = incidentesFiltrados.map((i) => [
    i.coordenadas.lat,
    i.coordenadas.lng,
    i.reportes / 10,
  ]);

  return (
    <div className="w-full h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-2">Edificio: {edificio}</h2>
        <label>
          Radio (metros):
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="border px-2 py-1 ml-2"
          />
        </label>
        <label>
          Fecha inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 ml-2"
          />
        </label>
        <label>
          Fecha fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 ml-2"
          />
        </label>
        <Link
          to="/reportes-edificios"
          state={{ incidentesFiltrados }}
          className="text-blue-500 underline ml-4"
        >
          Ver Reportes
        </Link>
      </div>
      <MapContainer
        center={[-33.426, -70.62]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
        maxBounds={bounds.length > 0 ? bounds : undefined}
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
        {zonasCalor.map((inc) => (
          <Circle
            key={inc.id}
            center={[inc.coordenadas.lat, inc.coordenadas.lng]}
            radius={radius}
            pathOptions={{ color: 'red', fillOpacity: 0.3 }}
          />
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

export default MapaEdificios;
