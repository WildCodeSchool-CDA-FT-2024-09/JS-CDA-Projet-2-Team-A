import { ReactElement } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const staticLinks: { name: string; url: string; icon: ReactElement }[] =
  [
    {
      name: "Déconnexion",
      url: "/deconnexion",
      icon: <LogoutOutlinedIcon />,
    },
  ];
