import React, { useEffect, useState } from "react";
import comunasData from "../../data/ComunasData.json";
import {
  FaBell,
  FaUserShield,
  FaExclamationTriangle,
  FaMap,
  FaChartLine,
  FaEye,
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa";
import { CiMap } from "react-icons/ci";
import { FaRegMap } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Comunas = () => {
  const [comunas, setComunas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setComunas(comunasData);
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Comunas Monitoreadas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comunas.map((comuna, i) => (
          <div
            key={i}
            className="bg-white border-l-4 border-red-500 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 "
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {comuna.nombre}
                    </h2>
                    <p className="text-sm text-gray-500">Comuna Monitoreada</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    comuna.predicciones.riesgo === "Alto"
                      ? "bg-red-100 text-red-700"
                      : comuna.predicciones.riesgo === "Medio"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {comuna.predicciones.riesgo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <span>Incidentes</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {comuna.incidentes}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <span>Alertas</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {comuna.alertas_activas}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FaRegMap className="text-blue-500 text-xl" />
                    <span>Perímetro</span>
                  </div>
                  <span className="font-medium text-slate-900">
                    {comuna.perimetro_km} km²
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FaPeopleRoof className="text-xl" />
                    <span>Habitantes</span>
                  </div>
                  <span className="font-medium text-slate-900">
                    {comuna.habitantes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <IoStatsChartOutline className="text-purple-500 text-xl" />
                    <span>Tendencia de Alertas</span>
                  </div>
                  <span className="font-medium text-slate-900">+12.5%</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/comuna/${comuna.nombre}`, { state: { comuna } })}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                <FaEye className="text-sm" />
                <span>Ver detalles</span>
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comunas;
