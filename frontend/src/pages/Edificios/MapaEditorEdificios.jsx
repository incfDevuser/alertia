import React, { useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

const center = [-33.426, -70.62]; // Ej: Providencia

const Editor = () => {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        polyline: false,
        rectangle: true,
        circle: false,
        marker: false,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      const geojson = layer.toGeoJSON();
      const coords = geojson.geometry.coordinates[0];

      localStorage.setItem("limiteEdificio", JSON.stringify(coords));
      alert("Zona del edificio guardada correctamente 🚀");
    });
  }, [map]);

  return null;
};

const MapaEditorEdificios = () => {
  return (
    <div className="w-full h-[80vh] rounded-xl overflow-hidden border border-gray-300">
      <MapContainer center={center} zoom={14} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup />
        <Editor />
      </MapContainer>
    </div>
  );
};

export default MapaEditorEdificios;
