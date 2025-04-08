import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

//Empresas
import Home from "./pages/Empresas/Home";
import NotFound from "./pages/Empresas/NotFound";
import Layout from "./components/Empresas/Layout";
import AnalisisIncidentes from "./pages/Empresas/AnalisisIncidentes";
import Comunas from "./pages/Empresas/Comunas";
import MapaIncidentes from "./pages/Empresas/MapaIncidentes";
import Proyecciones from "./pages/Empresas/Proyecciones";
import Reportes from "./pages/Empresas/Reportes";
import ComunaDetalle from "./pages/Empresas/ComunaDetalle";
import ReportesEmpresas from "./pages/Empresas/Reportes";

//Edificios
import HomeEdificios from "./pages/Edificios/HomeEdificios";
import LayoutEdificios from "./components/Edificios/LayoutEdificios";
import SeccionDePrueba from "./pages/Edificios/SeccionDePrueba";
import MapaEdificios from "./pages/Edificios/MapaEdificios";
import MapaEditorEdificios from "./pages/Edificios/MapaEditorEdificios";
import ReportesEdificios from "./pages/Edificios/ReportesEdificios";

//Municipalidades
import HomeMunicipalidad from "./pages/Municipalidades/HomeMunicipalidad";
import LayoutMunicipalidad from "./components/Municipalidades/LayoutMunicipalidad";
import MapaMunicipalidad from "./pages/Municipalidades/MapaMunicipalidad";
import ReportesMunicipalidades from "./pages/Municipalidades/Reportes";
import MapaEditor from "./pages/Municipalidades/MapaEditor";

//Paigna de inicio full
import HomePage from "./pages/HomePage";
import { HomePageMunicipalidad, HomePageEdificios } from "./pages/HomePage";

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
          <Route path="/" element={
            selectedType === "municipalidad" ? <HomePageMunicipalidad /> :
            selectedType === "edificios" ? <HomePageEdificios /> : <HomePage />
          } />
          {selectedType === "municipalidad" && (
            <Route element={<LayoutMunicipalidad />}>
              <Route path="/" element={<HomeMunicipalidad />} />
              <Route path="/mapa-incidentes" element={<MapaMunicipalidad />} />
              <Route path="/reportes-municipalidades" element={<ReportesMunicipalidades />} />
              <Route path="/editor-zona" element={<MapaEditor />} />
            </Route>
          )}
          {selectedType === "empresa" && (
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/comunas" element={<Comunas />} />
              <Route path="/comuna/:nombre" element={<ComunaDetalle />} />
              <Route path="/mapa-incidentes" element={<MapaIncidentes />} />
              <Route path="/analisis-incidentes" element={<AnalisisIncidentes />} />
              <Route path="/ReportesEmpresas" element={<ReportesEmpresas />} />
              <Route path="/proyecciones" element={<Proyecciones />} />
            </Route>
          )}
          {selectedType === "edificios" && (
            <Route element={<LayoutEdificios />}>
              <Route path="/" element={<HomeEdificios />} />
              <Route path="/edificios/mapa-incidentes" element={<MapaEdificios />} />
              <Route path="/edificios/reportes" element={<ReportesEdificios />} />
              <Route path="/edificios/editor-zona" element={<MapaEditorEdificios />} />
              <Route path="/seccion-de-prueba-edificios" element={<SeccionDePrueba />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
