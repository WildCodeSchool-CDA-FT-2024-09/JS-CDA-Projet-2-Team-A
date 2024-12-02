import { ReactElement } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const adminLinks: { name: string; url: string; icon: ReactElement }[] = [
  {
    name: "Utilisateurs",
    url: "utilisateurs",
    icon: <AccountCircleOutlinedIcon />,
  },
];
