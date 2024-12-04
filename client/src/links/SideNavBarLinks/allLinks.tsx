import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import InventoryIcon from "../../assets/svgIcons/InventoryIcon.tsx";

export const homePageUrls: { url: string; role: string }[] = [
  { url: "/admin", role: "4" },
  { url: "/atelier", role: "3" },
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
    role: ["3"],
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
