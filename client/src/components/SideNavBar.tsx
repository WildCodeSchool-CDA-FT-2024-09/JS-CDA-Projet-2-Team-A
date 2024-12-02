import { ReactElement } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import logo from "/StockManage_vert2-trans.png";

type SideNavBarProps = {
  arrayOfLinks: {
    name: string;
    url: string;
    icon: ReactElement;
  }[];
};

export default function SideNavBar({
  arrayOfLinks,
}: SideNavBarProps): ReactElement {
  const location = useLocation();
  const drawerWidthInDVW = "22dvw"; // Largeur de la navbar

  return (
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
        <Link to="/admin">
          <Box
            component="img"
            src={logo}
            alt="Logo Stock Manage"
            sx={{ maxWidth: "150px", width: "100%" }}
            height={"150px"}
          />
        </Link>
      </Toolbar>
      <List>
        {arrayOfLinks.map((link) => (
          <ListItem key={link.name}>
            <ListItemButton>
              <ListItemIcon
                children={link.icon}
                sx={{
                  minWidth: "fit-content",
                  maxWidth: "fit-content",
                  marginRight: "15px",
                  color: location.pathname.includes(`${link.url}`)
                    ? blue[500]
                    : "inherit",
                }}
              ></ListItemIcon>
              <ListItemText
                primary={
                  <NavLink
                    to={`${link.url}`}
                    style={({ isActive }: { isActive: boolean }) => ({
                      color: isActive ? blue[500] : "inherit",
                      textDecoration: "none",
                    })}
                  >
                    {link.name}
                  </NavLink>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
