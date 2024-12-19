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
  // TODO : Données provisoire en attendant la query

  const mainDetails = [
    { label: "Nom du produit :", value: "Câble Inox 4 / 35 mm" },
    { label: "Référence du produit :", value: "-" },
    { label: "Catégorie du produit :", value: "Câble" },
    { label: "Matériaux du produit :", value: "Inox" },
    { label: "Couleur du produit :", value: "Blanc" },
    { label: "Valeur seuil :", value: "158" },
  ];

  const additionalDetails = [
    { label: "Nom du fournisseur :", value: "fournisseur_45" },
    { label: "Contact fournisseur :", value: "Julie Richard" },
    { label: "Email contact :", value: "julie.richard@fournisseur_45.com" },
    { label: "Téléphone contact :", value: "+33 6 46 65 47 38" },
  ];

  const stockDetails = [
    { label: "Stock actuel :", value: "40" },
    { label: "En cours de livraison :", value: "12" },
  ];

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
        <Tabs aria-label="basic tabs example">
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
              justifyContent: "space-around",
              alignItems: "end",
              gap: "200px",
            }}
          >
            <Box
              sx={{
                width: "30%",
              }}
            >
              <List>
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
                    src="https://via.placeholder.com/150"
                    alt="Câble inox"
                    style={{
                      left: "0",
                      width: "150px",
                      height: "150px",
                      border: "2px dashed lightgray",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <List>
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
              mt: 3,
              mb: 2,
              color: "#383E49",
            }}
          >
            Détails Supplémentaires
          </Typography>
          <List>
            {additionalDetails.map((addDetail, index) => (
              <ListItemRow key={index} {...addDetail} />
            ))}
          </List>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
