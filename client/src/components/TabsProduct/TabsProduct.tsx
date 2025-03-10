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
import { useProductByIdQuery } from "../../generated/graphql-types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabsProductGlobalProps {
  product: string;
  description: string;
  category: string;
  material: string;
  color: string;
  min_quantity: number;
  supplier: string;
  employee: string;
  email_employee: string;
  phone_employee: string;
  stock: number;
  image: string;
}

// * Fonction pour générer des propriétés d'accessibilité pour les onglets
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// * Composant pour afficher le contenu d'un onglet
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

// * Composant pour afficher une ligne de détail
const ListItemRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}): JSX.Element => {
  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          gap: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ flex: "1", maxWidth: "150px" }}>
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Box sx={{ flex: "2" }}>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default function TabsProductGlobal({
  product,
  description,
  category,
  material,
  color,
  min_quantity,
  supplier,
  employee,
  email_employee,
  phone_employee,
  stock,
  image,
}: TabsProductGlobalProps) {
  const productByIdId = 1;
  const { data, loading, error } = useProductByIdQuery({
    variables: { productByIdId },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const mainDetails = [
    { label: "Nom :", value: product || "-" },
    { label: "Description :", value: description || "-" },
    { label: "Catégorie :", value: category || "-" },
    { label: "Matériau :", value: material || "-" },
    { label: "Couleur :", value: color || "-" },
    { label: "Valeur seuil :", value: min_quantity || "-" },
  ];

  const additionalDetails = [
    { label: "Nom du fournisseur :", value: supplier || "-" },
    { label: "Contact fournisseur :", value: employee || "-" },
    { label: "Email contact :", value: email_employee || "-" },
    { label: "Téléphone contact :", value: phone_employee || "-" },
  ];

  const stockDetails = [
    { label: "Stock actuel :", value: stock || "-" },
    { label: "En livraison :", value: "En cours de calcul" },
  ];

  if (loading)
    return (
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mt: 3,
          mb: 3,
          color: "#383E49",
        }}
      >
        Chargement en cours...
      </Typography>
    );

  if (error)
    return (
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mt: 3,
          mb: 3,
          color: "#383E49",
        }}
      >
        Une erreur s'est produite lors du chargement des données.
      </Typography>
    );

  if (data)
    return (
      <Box
        sx={{
          width: "100%",
          height: "73dvh",
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
        <CustomTabPanel index={0} value={0}>
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                mt: 3,
                mb: 2,
                color: "#383E49",
              }}
            >
              Détails principaux
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: "200px",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {mainDetails.map((mainDetail, index) => (
                    <ListItemRow key={index} {...mainDetail} />
                  ))}
                </List>
              </Box>
              <Box
                sx={{
                  width: "30%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    <img
                      src={image || "/image-placeholder.svg"}
                      alt={category}
                      style={{
                        left: "0",
                        width: "150px",
                        height: "150px",
                        border: "2px dashed lightgray",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                  <List
                    sx={{
                      width: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {stockDetails.map((stockDetail, index) => (
                      <ListItemRow key={index} {...stockDetail} />
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
          </Box>
          <Box
            sx={{
              width: "33dvw",
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                mt: 5,
                mb: 2,
                color: "#383E49",
              }}
            >
              Détails Supplémentaires
            </Typography>
            <List
              sx={{
                width: "100%",
                padding: 0,
                margin: 0,
              }}
            >
              {additionalDetails.map((addDetail, index) => (
                <ListItemRow key={index} {...addDetail} />
              ))}
            </List>
          </Box>
        </CustomTabPanel>
      </Box>
    );
}
