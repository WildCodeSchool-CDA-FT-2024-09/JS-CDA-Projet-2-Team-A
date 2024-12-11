import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { NavLink, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import { linkType, linkTypeOpt } from "../../types/SideNavBarTypes.ts";
import Typography from "@mui/material/Typography";

export default function SideNavBarList({
  link,
  baseUrl,
}: {
  link: linkType | linkTypeOpt;
  baseUrl: string;
}): ReactElement {
  const { pathname } = useLocation();

  return (
    <ListItem key={link.name}>
      <ListItemButton>
        <ListItemIcon
          children={link.icon}
          sx={{
            minWidth: "fit-content",
            maxWidth: "fit-content",
            marginRight: "15px",
            color: pathname.includes(`${link.url}`) ? blue[500] : "inherit",
          }}
        ></ListItemIcon>
        <ListItemText
          primary={
            link.url !== undefined ? (
              <NavLink
                to={baseUrl + "/" + link.url}
                style={({ isActive }: { isActive: boolean }) => ({
                  color: isActive ? blue[500] : "inherit",
                  textDecoration: "none",
                })}
              >
                {link.name}
              </NavLink>
            ) : (
              <Typography // Rajouter ici le onClick/onKeyDown lier à la déconnexion
              >
                {link.name}
              </Typography>
            )
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
