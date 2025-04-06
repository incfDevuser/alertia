import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

//Empresas
import Home from "./pages/Empresas/Home";
import NotFound from "./pages/Empresas/NotFound";
import Layout from "./components/Empresas/Layout";
//Edificios
import HomeEdificios from "./pages/Edificios/HomeEdificios";
import LayoutEdificios from "./components/Edificios/LayoutEdificios";
//Municipalidades
import HomeMunicipalidad from "./pages/Municipalidades/HomeMunicipalidad";
import LayoutMunicipalidad from "./components/Municipalidades/LayoutMunicipalidad";
import MapaMunicipalidad from "./pages/Municipalidades/MapaMunicipalidad";
import Reportes from "./pages/Municipalidades/Reportes";
import MapaEditor from "./pages/Municipalidades/MapaEditor";

//Paigna de inicio full
import HomePage from "./pages/HomePage";
import { HomePageMunicipalidad } from "./pages/HomePage";

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
        <Route path="/" element={<HomePageMunicipalidad />} />
          {selectedType === "municipalidad" && (
            <Route element={<LayoutMunicipalidad />}>
              <Route path="/" element={<HomeMunicipalidad />} />
              <Route path="/mapa-incidentes" element={<MapaMunicipalidad />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/editor-zona" element={<MapaEditor />} />
            </Route>
          )}
          {selectedType === "empresa" && (
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
          )}
          {selectedType === "edificios" && (
            <Route element={<LayoutEdificios />}>
              <Route path="/" element={<HomeEdificios />} />
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
