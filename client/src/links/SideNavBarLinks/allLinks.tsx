import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import InventoryIcon from "../../assets/svgIcons/InventoryIcon.tsx";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export const homePageUrls: { url: string; role: string }[] = [
  { url: "/approvisionnement", role: "2" },
  { url: "/atelier", role: "3" },
  { url: "/admin", role: "4" },
];

export const allLinks: {
  name: string;
  url: string;
  icon: ReactElement;
  role: string[];
}[] = [
  {
    name: "Utilisateurs",
    url: "utilisateurs",
    icon: <AccountCircleOutlinedIcon />,
    role: ["4"],
  },
  {
    name: "Inventaire",
    url: "inventaire",
    icon: <InventoryIcon />,
    role: ["2", "3"],
  },
  {
    name: "Commandes",
    url: "commandes",
    icon: <Inventory2OutlinedIcon />,
    role: ["2"],
  },
  {
    name: "Retours achats",
    url: "tickets",
    icon: <BallotOutlinedIcon />,
    role: ["3"],
  },
];

export const bottomLinks: { name: string; icon: ReactElement }[] = [
  {
    name: "Déconnexion",
    icon: <LogoutOutlinedIcon />,
  },
];
