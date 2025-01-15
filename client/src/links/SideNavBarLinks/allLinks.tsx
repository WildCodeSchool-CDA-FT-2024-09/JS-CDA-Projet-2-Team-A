import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

// Ici sont placés chaque équipe disponible dans l'application ainsi que l'url de retour à leur dashboard.
export const homePageUrls: { url: string; role: string }[] = [
  { url: "/achat", role: "achat" },
  { url: "/approvisionnement", role: "approvisionnement" },
  { url: "/atelier", role: "atelier" },
  { url: "/admin", role: "admin" },
];

// Ici sont placés tous les liens propres à chaque équipe selon les rôles attribués.
export const allLinks: {
  name: string;
  url: string;
  icon: ReactElement;
  role: string[];
}[] = [
  {
    name: "Inventaire",
    url: "",
    icon: <ChecklistOutlinedIcon />,
    role: ["achat", "approvisionnement", "atelier"],
  },
  {
    name: "Commandes",
    url: "commandes",
    icon: <Inventory2OutlinedIcon />,
    role: ["achat", "approvisionnement"],
  },
  {
    name: "Fournisseurs",
    url: "fournisseurs",
    icon: <AccountCircleOutlinedIcon />,
    role: ["achat"],
  },
  {
    name: "Retours atelier",
    url: "tickets",
    icon: <BallotOutlinedIcon />,
    role: ["achat"],
  },
  {
    name: "Retours achats",
    url: "tickets",
    icon: <BallotOutlinedIcon />,
    role: ["atelier"],
  },
  {
    name: "Utilisateurs",
    url: "utilisateurs",
    icon: <AccountCircleOutlinedIcon />,
    role: ["admin"],
  },
];

// Ici sont placés les liens, en bas de navbar, commun à chaque équipe.
export const bottomLinks: { name: string; icon: ReactElement }[] = [
  {
    name: "Déconnexion",
    icon: <LogoutOutlinedIcon />,
  },
];
