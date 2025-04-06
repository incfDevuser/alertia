import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Empresas
import Home from "./pages/Empresas/Home";
import NotFound from "./pages/Empresas/NotFound";
import Layout from "./components/Empresas/Layout";
import AnalisisIncidentes from "./pages/Empresas/AnalisisIncidentes";
import Comunas from "./pages/Empresas/Comunas";
import MapaIncidentes from "./pages/Empresas/MapaIncidentes";
import Proyecciones from "./pages/Empresas/Proyecciones";
import Reportes from "./pages/Empresas/Reportes";
//Edificios
import HomeEdificios from "./pages/Edificios/HomeEdificios";
import LayoutEdificios from "./components/Edificios/LayoutEdificios";
import SeccionDePrueba from "./pages/Edificios/SeccionDePrueba";
//Municipalidades
import HomeMunicipalidad from "./pages/Municipalidades/HomeMunicipalidad";
import SeccionPruebas from "./pages/Municipalidades/SeccionPruebas";
import LayoutMunicipalidad from "./components/Municipalidades/LayoutMunicipalidad";

//Paigna de inicio full
import HomePage from "./pages/HomePage";

function App() {
  const [selectedType, setSelectedType] = useState("default");

  return (
    <div>
      <div className="p-4">
        <label htmlFor="type-selector" className="mr-2">
          Select Type:
        </label>
        <select
          id="type-selector"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="default">Default</option>
          <option value="municipalidad">Municipalidad</option>
          <option value="empresa">Empresa</option>
          <option value="edificios">Edificios</option>
        </select>
      </div>
      <BrowserRouter>
        <Routes>
          {selectedType === "municipalidad" && (
            <Route element={<LayoutMunicipalidad />}>
              <Route path="/" element={<HomeMunicipalidad />} />
              <Route path="/seccion-de-prueba" element={<SeccionPruebas />} />
            </Route>
          )}
          {selectedType === "empresa" && (
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/comunas" element={<Comunas />} />
              <Route path="/mapa-incidentes" element={<MapaIncidentes />} />
              <Route path="/analisis-incidentes" element={<AnalisisIncidentes />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/proyecciones" element={<Proyecciones />} />
            </Route>
          )}
          {selectedType === "edificios" && (
            <Route element={<LayoutEdificios />}>
              <Route path="/" element={<HomeEdificios />} />
              <Route path="/seccion-de-prueba-edificios" element={<SeccionDePrueba />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
