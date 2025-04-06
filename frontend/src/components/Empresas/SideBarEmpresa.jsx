import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBarEmpresa = () => {
  const location = useLocation();
  const links = [
    { id: 1, path: "/empresa/dashboard", label: "Dashboard" },
    { id: 2, path: "/empresa/reports", label: "Reports" },
  ];

  return (
    <nav className="h-screen w-64">
      <div className="flex flex-col py-6 px-4">
        <div className="flex flex-col space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                to={link.path}
                key={link.id}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideBarEmpresa;
