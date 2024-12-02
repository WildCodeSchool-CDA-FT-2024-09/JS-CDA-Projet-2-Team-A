import { ReactElement } from "react";
import SideNavBar from "../components/SideNavBar.tsx";
import { adminLinks } from "../assets/SideNavBarLinks/AdminLinks.tsx";
import { Box } from "@mui/material";

export default function AdminPage(): ReactElement {
  return (
    <Box component="main">
      <SideNavBar arrayOfLinks={adminLinks} />
    </Box>
  );
}
