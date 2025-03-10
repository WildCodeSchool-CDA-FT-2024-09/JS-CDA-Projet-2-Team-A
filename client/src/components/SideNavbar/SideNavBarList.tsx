import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactElement } from "react";
import { linkType, linkTypeOpt } from "../../types/SideNavBarTypes.ts";
import Typography from "@mui/material/Typography";
import { useLogoutMutation } from "../../generated/graphql-types.ts";
import { useUser } from "../../contexts/UserContext";

export default function SideNavBarList({
  link,
  baseUrl,
}: {
  link: linkType | linkTypeOpt;
  baseUrl: string;
}): ReactElement {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [logout] = useLogoutMutation();
  const { setUser } = useUser();

  const fullLogout = () => {
    logout()
      .then((response) => {
        if (response.errors && response.errors.length > 0) {
          console.error(
            "Erreur GraphQL lors de la déconnexion : ",
            response.errors,
          );
          return;
        }

        setUser({
          name: "",
          login: "",
          role: "",
        });
        navigate("/");
      })

      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la déconnexion : ",
          error,
        );
      });
  };

  let listItemProps = {};
  if (link.url !== undefined) {
    listItemProps = { component: "a", href: baseUrl + "/" + link.url };
  } else {
    listItemProps = { component: "button", onClick: fullLogout };
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
            color:
              pathname === `${baseUrl}/${link.url}` ? blue[500] : "inherit",
          }}
        ></ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{
                color:
                  pathname === `${baseUrl}/${link.url}` ? blue[500] : "inherit",
              }}
            >
              {link.name}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
