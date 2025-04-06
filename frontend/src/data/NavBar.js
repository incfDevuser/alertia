import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsMap } from "react-icons/bs";
import { BiAnalyse } from "react-icons/bi";
import { VscReport } from "react-icons/vsc";
import { MdOutlineQueryStats } from "react-icons/md";

const NavLinksEmpresas = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    id: 2,
    label: "Comunas",
    path: "/comunas",
    icon: HiOutlineOfficeBuilding,
  },
  {
    id: 3,
    label: "Mapa de Incidentes",
    path: "/mapa-incidentes",
    icon: BsMap,
  },
  {
    id: 4,
    label: "Analisis de incidentes",
    path: "/analisis-incidentes",
    icon: BiAnalyse,
  },
  {
    id: 5,
    label: "Reportes",
    path: "/reportes",
    icon: VscReport,
  },
  {
    id: 6,
    label: "Proyecciones",
    path: "/proyecciones",
    icon: MdOutlineQueryStats,
  },
];
const NavLinksMunicipalidades = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    id: 3,
    label: "Mapa de Incidentes",
    path: "/mapa-incidentes",
    icon: BsMap,
  },
  {
    id: 4,
    label: "Reportes",
    path: "/reportes",
    icon: VscReport,
  },
  {
    id: 5,
    label: "Editor de Zona",
    path: "/editor-zona",
    icon: BsMap,
  }
];
const NavLinksEdificios = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    id: 2,
    label: "Seccion de Prueba",
    path: "/seccion-de-prueba",
    icon: AiOutlineHome,
  },
];
export const NavLinks = {
  NavLinksEmpresas,
  NavLinksMunicipalidades,
  NavLinksEdificios
};
