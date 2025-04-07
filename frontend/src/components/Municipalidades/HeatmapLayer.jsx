import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat';

const HeatmapLayer = ({ puntos }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = window.L.heatLayer(puntos, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, puntos]);

  return null;
};

export default HeatmapLayer;
