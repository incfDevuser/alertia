import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  FaArrowLeft,
  FaMapMarkedAlt,
  FaUserShield,
  FaChartLine,
  FaExclamationTriangle,
  FaBell,
  FaCalendarAlt,
  FaChartBar,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler,
} from "chart.js";
import { MapContainer, TileLayer, useMap, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { comunasGeoJSON } from "../../data/comunasGeoJSON";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler
);
const HeatmapLayer = ({ points, options }) => {
  const map = useMap();
  useEffect(() => {
    if (!points) return;
    const heatLayer = L.heatLayer(points, options).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, options]);
  return null;
};
const ComunaDetalle = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { comuna } = state || {};
  if (!comuna) {
    return <div>No hay datos disponibles</div>;
  }
  const incidentesData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Incidentes",
        data: [45, 52, 48, 60, 53, 58],
        fill: true,
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgb(239, 68, 68)",
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const heatmapPoints = [
    [-33.5957, -70.5664, 0.9],
    [-33.596, -70.567, 0.8],
    [-33.5955, -70.568, 0.7],

    [-33.6, -70.57, 1.0],
    [-33.6005, -70.5705, 0.9],
    [-33.5995, -70.5695, 0.8],
    [-33.598, -70.575, 0.9],
    [-33.5985, -70.5755, 0.8],
    [-33.5975, -70.5745, 0.7],
    [-33.602, -70.58, 0.6],
    [-33.6025, -70.5805, 0.5],
    [-33.6015, -70.5795, 0.7],
    [-33.604, -70.585, 0.8],
    [-33.6045, -70.5855, 0.7],
    [-33.6035, -70.5845, 0.9],
  ];
  const heatLayerOptions = {
    radius: 25,
    blur: 15,
    maxZoom: 15,
    gradient: {
      0.2: "blue",
      0.4: "cyan",
      0.6: "lime",
      0.8: "yellow",
      1.0: "red",
    },
  };
  const distribucionIncidentes = [
    { tipo: "Robo", porcentaje: 42, cantidad: 126 },
    { tipo: "Violencia", porcentaje: 28, cantidad: 84 },
    { tipo: "Vandalismo", porcentaje: 18, cantidad: 54 },
    { tipo: "Otros", porcentaje: 12, cantidad: 36 },
  ];
  const polygonStyle = {
    fillColor: "transparent",
    weight: 2,
    opacity: 1,
    color: "red",
    dashArray: "5, 5",
  };

  return (
    <div className="min-h-screen">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-800 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <FaArrowLeft /> Volver al listado
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Comuna de {comuna.nombre}
              </h1>
              <p className="text-slate-500">
                Dashboard de monitoreo y análisis
              </p>
            </div>
            <div className="flex gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1
                ${
                  comuna.predicciones.riesgo === "Alto"
                    ? "bg-red-100 text-red-700"
                    : comuna.predicciones.riesgo === "Medio"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <FaExclamationTriangle className="text-xs" />
                Riesgo {comuna.predicciones.riesgo}
              </span>
              <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100">
                Últimos 30 días
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <div className="p-2 bg-blue-100 rounded">
                  <FaMapMarkedAlt className="text-blue-600" />
                </div>
                <span>Perímetro</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {comuna.perimetro_km} km²
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <div className="p-2 bg-green-100 rounded">
                  <FaUserShield className="text-green-600" />
                </div>
                <span>Habitantes</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {comuna.habitantes.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <div className="p-2 bg-red-100 rounded">
                  <FaExclamationTriangle className="text-red-600" />
                </div>
                <span>Incidentes</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {comuna.incidentes}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <div className="p-2 bg-yellow-100 rounded">
                  <FaBell className="text-yellow-600" />
                </div>
                <span>Alertas activas</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {comuna.alertas_activas}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Mapa de Calor de Incidentes
              </h3>
              <p className="text-sm text-slate-500">
                Distribución geográfica de incidentes
              </p>
            </div>
          </div>
          <div className="h-[500px] rounded-lg overflow-hidden">
            <MapContainer
              center={[-33.5957, -70.5664]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {comunasGeoJSON[comuna.nombre] && (
                <Polygon
                  positions={comunasGeoJSON[
                    comuna.nombre
                  ].geometry.coordinates[0].map((coord) => [
                    coord[1],
                    coord[0],
                  ])}
                  pathOptions={polygonStyle}
                />
              )}
              <HeatmapLayer points={heatmapPoints} options={heatLayerOptions} />
            </MapContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Tendencia de Incidentes
                </h3>
                <p className="text-sm text-slate-500">Últimos 6 meses</p>
              </div>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-2">
                <option>Este año</option>
                <option>Último trimestre</option>
              </select>
            </div>
            <div className="h-[300px]">
              {" "}
              {/* Altura fija para el gráfico */}
              <Line data={incidentesData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Distribución de Incidentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {distribucionIncidentes.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          i === 0
                            ? "bg-red-500"
                            : i === 1
                            ? "bg-yellow-500"
                            : i === 2
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="text-sm text-slate-600">
                        {item.tipo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            i === 0
                              ? "bg-red-500"
                              : i === 1
                              ? "bg-yellow-500"
                              : i === 2
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }`}
                          style={{ width: `${item.porcentaje}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-16">
                        {item.cantidad}
                      </span>
                      <span className="text-xs text-slate-500">
                        {item.porcentaje}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComunaDetalle;
