import { ReactElement } from "react";
import { AccountCircleOutlined } from "@mui/icons-material";

export const adminLinks: { name: string; url: string; icon: ReactElement }[] = [
  {
    name: "Utilisateurs",
    url: "utilisateurs",
    icon: <AccountCircleOutlined />,
  },
];
