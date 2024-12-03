import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, List, Toolbar } from "@mui/material";
import SideNavBarList from "./SideNavBarList.tsx";
import {
  allLinks,
  bottomLinks,
  homePageUrls,
} from "../../links/SideNavBarLinks/allLinks.tsx";
import { linkType, linkTypeOpt } from "../../types/SideNavBarTypes.ts";
import logo from "/StockManage_logo_xl.png";

export default function SideNavBar(): ReactElement {
  const adminRole = "4"; // Ecrit en dur en attente de la mise en place du contexte.
  const { url } = homePageUrls.find((link) => link.role.includes(adminRole))!; // Récupération de l'url selon le rôle de l'utilisateur
  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "22dvw", // largeur de la navbar
            minWidth: "200px",
            maxWidth: "250px",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link to={url}>
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
          {allLinks.reduce((acc: ReactElement[], link: linkType) => {
            if (link.role.includes(adminRole)) {
              acc.push(<SideNavBarList link={link} key={link.name} />);
            }
            return acc;
          }, [])}
        </List>
        <Box sx={{ marginTop: "auto" }}>
          <List>
            {bottomLinks.map((link: linkTypeOpt) => (
              <SideNavBarList link={link} key={link.name} />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
