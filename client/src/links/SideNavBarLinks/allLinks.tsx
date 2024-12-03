import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const homePageUrls: { url: string; role: string }[] = [
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
];

export const bottomLinks: { name: string; icon: ReactElement }[] = [
  {
    name: "Déconnexion",
    icon: <LogoutOutlinedIcon />,
  },
];
