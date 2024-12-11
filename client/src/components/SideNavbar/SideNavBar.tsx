import { ReactElement } from "react";
import { Link } from "react-router-dom";
import SideNavBarList from "./SideNavBarList.tsx";
import { useUser } from "../../contexts/UserContext.tsx";
import { Box, Drawer, List, Toolbar } from "@mui/material";
import {
  allLinks,
  bottomLinks,
  homePageUrls,
} from "../../links/SideNavBarLinks/allLinks.tsx";
import { linkType, linkTypeOpt } from "../../types/SideNavBarTypes.ts";
import logo from "/StockManage_logo_xl.png";

export default function SideNavBar(): ReactElement {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const foundLink = homePageUrls.find((link) => link.role.includes(user.role));

  if (!foundLink) {
    console.error("No matching link found for the user's role:", user.role);
    return <div>Error: No home page URL available for this role.</div>;
  }

  const { url } = foundLink;

  //const { url } = homePageUrls.find((link) => link.role.includes(user!.role))!; // Récupération de l'url selon le rôle de l'utilisateur

  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          height: "100%",
          width: "22dvw", // largeur de la navbar
          minWidth: "200px",
          maxWidth: "250px",
          boxSizing: "border-box",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            // Obligatoire de répéter les propriétés suivantes. Il doit dépendre du parent.
            height: "inherit",
            width: "inherit",
            minWidth: "inherit",
            maxWidth: "inherit",
            boxSizing: "inherit",
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
            if (link.role.includes(user!.role)) {
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
