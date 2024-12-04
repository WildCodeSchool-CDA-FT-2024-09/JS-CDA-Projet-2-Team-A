import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

// Ici sont placés chaque équipe disponible dans l'application ainsi que l'url de retour à leur dashboard.
export const homePageUrls: { url: string; role: string }[] = [
  { url: "/achat", role: "1" },
  { url: "/approvisionnement", role: "2" },
  { url: "/atelier", role: "3" },
  { url: "/admin", role: "4" },
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
    url: "inventaire",
    icon: <ChecklistOutlinedIcon />,
    role: ["1", "2", "3"],
  },
  {
    name: "Commandes",
    url: "commandes",
    icon: <Inventory2OutlinedIcon />,
    role: ["1", "2"],
  },
  {
    name: "Fournisseurs",
    url: "fournisseurs",
    icon: <AccountCircleOutlinedIcon />,
    role: ["1"],
  },
  {
    name: "Retours atelier",
    url: "tickets",
    icon: <BallotOutlinedIcon />,
    role: ["1"],
  },
  {
    name: "Retours achats",
    url: "tickets",
    icon: <BallotOutlinedIcon />,
    role: ["3"],
  },
  {
    name: "Utilisateurs",
    url: "utilisateurs",
    icon: <AccountCircleOutlinedIcon />,
    role: ["4"],
  },
];

// Ici sont placés les liens, en bas de navbar, commun à chaque équipe.
export const bottomLinks: { name: string; icon: ReactElement }[] = [
  {
    name: "Déconnexion",
    icon: <LogoutOutlinedIcon />,
  },
];
