import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, List, Toolbar } from "@mui/material";
import SideNavBarList from "./SideNavBarList.tsx";
import { staticLinks } from "../assets/SideNavBarLinks/StaticLinks.tsx";
import { linkType, SideNavBarPropsType } from "../types/SideNavBarTypes.ts";
import logo from "/StockManage_logo_xl.png";

export default function SideNavBar({
  teamLinks,
  teamDashboardUrl,
}: SideNavBarPropsType): ReactElement {
  const drawerWidthInDVW = "22dvw"; // Largeur de la navbar

  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidthInDVW,
            minWidth: "200px",
            maxWidth: "250px",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link to={`/${teamDashboardUrl}`}>
            <Box
              component="img"
              src={logo}
              alt="Logo Stock Manage"
              loading="lazy"
              sx={{ maxWidth: "150px", width: "100%" }}
              height={"150px"}
            />
          </Link>
        </Toolbar>
        <List>
          {teamLinks.map((link: linkType) => (
            <SideNavBarList link={link} key={link.name} />
          ))}
        </List>
        <Box sx={{ marginTop: "auto" }}>
          <List>
            {staticLinks.map((link: linkType) => (
              <SideNavBarList link={link} key={link.name} />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
