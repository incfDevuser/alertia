import React from "react";
import data from "../../data/HomeData.json";
import { useEffect, useState } from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
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
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);
const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    setHomeData(data);
  }, []);
  if (!homeData)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  const pieData = {
    labels: ["Resueltos", "Pendientes"],
    datasets: [
      {
        data: [
          parseInt(homeData.tasa_resolucion),
          100 - parseInt(homeData.tasa_resolucion),
        ],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#45A049", "#E53935"],
      },
    ],
  };
  const barData = {
    labels: homeData.tendencia_alertas_graves.map((item) => item.mes),
    datasets: [
      {
        label: "Alertas Graves",
        data: homeData.tendencia_alertas_graves.map(
          (item) => item.alertas_graves
        ),
        backgroundColor: "rgba(244, 67, 54, 0.8)",
        borderRadius: 8,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
    cutout: "60%",
  };
  const barOptions = {
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
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Panel de Control
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-sm text-gray-500">Total Incidentes</h2>
            <p className="text-2xl font-bold text-red-500">
              {homeData.total_incidentes}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
          <FaCheckCircle className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-sm text-gray-500">Tasa de Resolución</h2>
            <p className="text-2xl font-bold text-green-500">
              {homeData.tasa_resolucion}%
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4">
          <FaShieldAlt className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-sm text-gray-500">Índice Seguridad</h2>
            <p className="text-2xl font-bold text-blue-500">
              {homeData.indice_seguridad}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition col-span-2 md:col-span-1">
          <h2 className="text-sm text-gray-500 flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-500" /> Zonas de Alto Riesgo
          </h2>
          <ul className="text-sm mt-2 list-disc list-inside text-gray-700">
            {homeData.zonas_alto_riesgo.map((zona, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{zona.nombre}</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  {zona.incidentes_recientes} incidentes
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Distribución de Resolución
          </h2>
          <div className="h-[300px] relative">
            <Pie data={pieData} options={pieOptions} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-gray-800">
                {homeData.tasa_resolucion}
              </span>
              <span className="text-sm text-gray-500">Resueltos</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Tendencia de Alertas Graves
          </h2>
          <div className="h-[300px]">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Comunas Más Afectadas
          </h2>
          <div className="space-y-3">
            {homeData.comunas_mas_riesgo.map((comuna, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{comuna.nombre}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${
                          (comuna.incidentes / homeData.total_incidentes) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {comuna.incidentes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recomendaciones Estratégicas
          </h2>
          <div className="space-y-4">
            {homeData.recomendaciones.map((r, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <strong className="text-sm text-gray-800">{r.zona}</strong>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      r.riesgo === "Crítico"
                        ? "bg-red-100 text-red-700"
                        : r.riesgo === "Emergente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {r.riesgo}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{r.mensaje}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
