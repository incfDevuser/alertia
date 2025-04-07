export const generateIncidentes = (bounds, numIncidentes = 10) => {
    const incidentes = [];
    for (let i = 0; i < numIncidentes; i++) {
      const lat = Math.random() * (bounds[0][0] - bounds[2][0]) + bounds[2][0];
      const lng = Math.random() * (bounds[1][1] - bounds[0][1]) + bounds[0][1];
      incidentes.push({
        id: `inc${i + 1}`,
        tipo: Math.random() > 0.5 ? "robo" : "asalto",
        coordenadas: { lat, lng },
        fecha: new Date().toISOString(),
        reportes: Math.floor(Math.random() * 10) + 1,
        validado: Math.random() > 0.5,
      });
    }
    return incidentes;
  };