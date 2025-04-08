import React from 'react';
import { useLocation } from 'react-router-dom';

const ReportesEdificios = () => {
  const location = useLocation();
  const incidentesFiltrados = location.state?.incidentesFiltrados || [];

  if (!incidentesFiltrados.length) {
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold">Estadísticas de Incidentes</h2>
        <p>No hay incidentes dentro de la zona del edificio.</p>
      </div>
    );
  }

  const totalIncidentes = incidentesFiltrados.length;
  const promedioReportes = (
    incidentesFiltrados.reduce((sum, inc) => sum + inc.reportes, 0) / totalIncidentes
  ).toFixed(2);

  const incidentesPorTipo = incidentesFiltrados.reduce((acc, inc) => {
    acc[inc.tipo] = (acc[inc.tipo] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Estadísticas de Incidentes</h2>
      </div>

      <div className="space-y-2">
        <p><strong>Total de incidentes:</strong> {totalIncidentes}</p>
        <p><strong>Promedio de reportes:</strong> {promedioReportes}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Incidentes por tipo</h3>
        <ul className="ml-6 list-disc">
          {Object.entries(incidentesPorTipo).map(([tipo, cant]) => (
            <li key={tipo}>{tipo}: {cant}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportesEdificios;
