import React from "react";
import { Outlet } from "react-router-dom";
import SideBarMunicipalidad from "./SideBarMunicipalidad";
import AlartiaLogo from "../../assets/img/LOGOAPP_-_copia-removebg-preview.png";

function LayoutMunicipalidad() {
  return (
    <div className="p-11 flex flex-col gap-10">
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-2">
          <img
            src={AlartiaLogo}
            alt="alartia_logo.png"
            className="w-[50px] h-auto"
          />
          <h2>
            Alartia <span className="font-bold">Municipios</span>
          </h2>
        </div>
        <div>
          <h1 className="text-xl">
            Bienvenido a <span className="font-bold">Alartia Municipalidades</span>
          </h1>
          <p className="text-gray-500">
            Desde esta vista, puedes ver las alertas o incidentes a lo largo de
            todo el mapa
          </p>
        </div>
      </div>
      <div className="flex h-screen">
        <SideBarMunicipalidad />
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutMunicipalidad;
