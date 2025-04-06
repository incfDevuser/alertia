import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLinks } from "../../data/NavBar";
function SideBarMunicipalidad() {
  const location = useLocation();

  return (
    <nav className="h-screen w-64">
      <div className="flex flex-col py-6 px-4">
        <div className="flex flex-col space-y-2">
          {NavLinks.NavLinksMunicipalidades.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                to={link.path}
                key={link.id}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-700 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <link.icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default SideBarMunicipalidad;
