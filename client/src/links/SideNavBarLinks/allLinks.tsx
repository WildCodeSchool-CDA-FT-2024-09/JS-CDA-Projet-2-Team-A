import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const allLinks: {
  admin: { name: string; url: string; icon: ReactElement }[];
  static: { name: string; icon: ReactElement }[];
} = {
  admin: [
    {
      name: "Utilisateurs",
      url: "utilisateurs",
      icon: <AccountCircleOutlinedIcon />,
    },
  ],
  static: [
    {
      name: "Déconnexion",
      icon: <LogoutOutlinedIcon />,
    },
  ],
};
