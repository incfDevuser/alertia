// Crea un archivo, por ejemplo, /src/config/leafletIcons.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Elimina las rutas por defecto delete L.Icon.Default.prototype._getIconUrl;

// Configura los íconos para que Leaflet los ubique correctamente L.Icon.Default.mergeOptions({ iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), iconUrl: require('leaflet/dist/images/marker-icon.png'), shadowUrl: require('leaflet/dist/images/marker-shadow.png'), });

export default L;