import React from 'react';
import incidentesData from '../../data/incidentes.json';
import { BiBarChart, BiTimeFive } from 'react-icons/bi';
import { MdReport } from 'react-icons/md';

const Reportes = () => {
  const { estadisticas } = incidentesData;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <div className="flex items-center gap-2">
        <MdReport className="text-3xl text-cyan-600" />
        <h2 className="text-2xl font-bold">Estadísticas de Incidentes</h2>
      </div>

      <div className="space-y-2">
        <p><strong>Total de incidentes:</strong> {estadisticas.totalIncidentes}</p>
        <p><strong>Promedio de reportes:</strong> {estadisticas.promedioReportes}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2"><BiBarChart /> Incidentes por tipo</h3>
        <ul className="ml-6 list-disc">
          {Object.entries(estadisticas.incidentesPorTipo).map(([tipo, cant]) => (
            <li key={tipo}>{tipo}: {cant}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2"><BiTimeFive /> Incidentes por hora</h3>
        <ul className="ml-6 list-disc">
          {Object.entries(estadisticas.incidentesPorHora).map(([hora, cant]) => (
            <li key={hora}>{hora}:00 - {cant} incidentes</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reportes;
