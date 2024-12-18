import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 0, pr: 3, pl: 3, pb: 0 }}>{children}</Box>
      )}
    </Box>
  );
}

const ListItemRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element => {
  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </ListItem>
  );
};

export default function TabsProductGlobal() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // TODO : Données provisoire en attendant la query

  const ListItemMainDetail = [
    { label: "Nom du produit :", value: "Câble Inox 4 / 35 mm" },
    { label: "Référence du produit :", value: "-" },
    { label: "Catégorie du produit :", value: "Câble" },
    { label: "Matériaux du produit :", value: "Inox" },
    { label: "Couleur du produit :", value: "Blanc" },
  ];

  const ListItemAddDetail = [
    { label: "Nom du fournisseur :", value: "fournisseur_45" },
    { label: "Contact fournisseur :", value: "Julie Richard" },
    { label: "Email contact :", value: "julie.richard@fournisseur_45.com" },
    { label: "Téléphone contact :", value: "+33 6 46 65 47 38" },
  ];

  const ListItemStockDetail = [
    { label: "Stock actuel :", value: "40" },
    { label: "En cours de livraison :", value: "12" },
    { label: "Valeur seuil :", value: "158" },
  ];
  console.info(ListItemAddDetail, ListItemStockDetail);

  return (
    <Box
      sx={{
        width: "100%",
        height: "75dvh",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Aperçu" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              mt: 3,
              mb: 3,
              color: "#383E49",
            }}
          >
            Détails principaux
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "40%",
              }}
            >
              <List disablePadding>
                {ListItemMainDetail.map((mainDetail, index) => (
                  <ListItemRow key={index} {...mainDetail} />
                ))}
              </List>
            </Box>
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Box>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Câble inox"
                  style={{
                    left: "0",
                    width: "150px",
                    height: "150px",
                    border: "1px dashed lightgray",
                    borderRadius: "8px",
                  }}
                />
                <List>
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">Stock actuel</Typography>
                      <Typography variant="body2">40</Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">Valeur seuil</Typography>
                      <Typography variant="body2">12</Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        En cours de livraison
                      </Typography>
                      <Typography variant="body2">158</Typography>
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
        <Box>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              mt: 3,
              mb: 3,
              color: "#383E49",
            }}
          >
            Détails Supplémentaires
          </Typography>
          <List>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">Nom du fournisseur</Typography>
                <Typography variant="body2">Fournisseur n°45</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">Contact fournisseur</Typography>
                <Typography variant="body2">Julie Richard</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">Email contact</Typography>
                <Typography variant="body2">
                  julie.richard@fournisseur_45.com
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">Téléphone contact</Typography>
                <Typography variant="body2">+33 533 354 3168</Typography>
              </Box>
            </ListItem>
          </List>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
