import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
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

  const teste = () => {
    alert("test");
  };

  let listItemProps = {};
  if (link.url !== undefined) {
    listItemProps = { component: "a", href: baseUrl + "/" + link.url };
  } else {
    listItemProps = { component: "button", onClick: teste };
  }

  return (
    <ListItem key={link.name}>
      <ListItemButton {...listItemProps}>
        <ListItemIcon
          children={link.icon}
          sx={{
            minWidth: "fit-content",
            maxWidth: "fit-content",
            marginRight: "15px",
            color: pathname.includes(`${link.url}`) ? blue[500] : "inherit",
          }}
        ></ListItemIcon>
        <ListItemText primary={<Typography>{link.name}</Typography>} />
      </ListItemButton>
    </ListItem>
  );
}
