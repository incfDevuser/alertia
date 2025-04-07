export const generateRutasOptimas = (incidentes) => {
    const rutas = [];
    const visited = new Set();
  
    incidentes.forEach((start, index) => {
      if (visited.has(start.id)) return;
  
      const ruta = { id: `ruta${index + 1}`, puntos: [start.coordenadas] };
      visited.add(start.id);
  
      let current = start;
      while (true) {
        const next = incidentes
          .filter((i) => !visited.has(i.id))
          .reduce((closest, i) => {
            const dist = Math.sqrt(
              Math.pow(i.coordenadas.lat - current.coordenadas.lat, 2) +
                Math.pow(i.coordenadas.lng - current.coordenadas.lng, 2)
            );
            return dist < closest.dist ? { dist, incident: i } : closest;
          }, { dist: Infinity, incident: null });
  
        if (!next.incident) break;
  
        ruta.puntos.push(next.incident.coordenadas);
        visited.add(next.incident.id);
        current = next.incident;
      }
  
      rutas.push(ruta);
    });
  
    return rutas;
  };