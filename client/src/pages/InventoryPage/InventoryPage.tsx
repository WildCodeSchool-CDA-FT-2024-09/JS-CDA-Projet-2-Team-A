import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardList from "../../components/DashboardList/DashboardList";
import DashboardSummary from "../../components/DashboardSummary/DashboardSummary";
import { useAllProductsQuery } from "../../generated/graphql-types";
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Chip,
  Switch,
  Tooltip,
} from "@mui/material";
import { GridRowSelectionModel, GridRenderCellParams } from "@mui/x-data-grid";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function InventoryPage() {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [switchStates, setSwitchStates] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  const { data, loading, error } = useAllProductsQuery();

  const chipStatus = [
    {
      id: 1,
      name: "En stock",
      component: (
        <Chip
          label="En stock"
          variant="outlined"
          size="small"
          color="success"
          icon={<DoneOutlinedIcon />}
        />
      ),
    },
    {
      id: 2,
      name: "Stock faible",
      component: (
        <Chip
          label="Stock faible"
          variant="outlined"
          size="small"
          color="warning"
          icon={<ReportProblemOutlinedIcon />}
        />
      ),
    },
    {
      id: 3,
      name: "En rupture",
      component: (
        <Chip
          label="En rupture"
          variant="outlined"
          size="small"
          color="error"
          icon={<CloseOutlinedIcon />}
        />
      ),
    },
  ];

  const dataGridProduct =
    data?.allProducts
      ?.map((product, index) => {
        const minQuantity = product.min_quantity ?? 0;
        const stock = product.stock ?? 0;
        let status, priority;
        if (stock > minQuantity) {
          status = chipStatus[0];
          priority = 3;
        } else if (stock > 0 && stock <= minQuantity) {
          status = chipStatus[1];
          priority = 2;
        } else {
          status = chipStatus[2];
          priority = 1;
        }

        return {
          id: index + 1,
          category: product.category,
          product: product.product,
          material: product.material,
          color: product.color,
          description: product.description,
          minimal: minQuantity,
          stock: stock,
          status: status.component,
          priority: priority,
          supplier: product.supplier?.name,
        };
      })
      ?.sort((a, b) => a.priority - b.priority) || [];

  useEffect(() => {
    if (Object.keys(switchStates).length === 0 && dataGridProduct.length > 0) {
      const initialStates = dataGridProduct.reduce(
        (acc, product) => {
          acc[product.id] = true; // Par défaut, tous les Switches sont activés
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setSwitchStates(initialStates);
    }
  }, [dataGridProduct, switchStates]);

  const handleSwitchChange = (id: number) => {
    setSwitchStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const columns = [
    { field: "category", headerName: "Catégorie", flex: 1, maxWidth: 250 },
    { field: "product", headerName: "Produit", flex: 1, maxWidth: 250 },
    { field: "material", headerName: "Matériau", flex: 1, maxWidth: 150 },
    { field: "color", headerName: "Couleur", flex: 1, maxWidth: 150 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "minimal", headerName: "Seuil", flex: 1, maxWidth: 150 },
    { field: "stock", headerName: "Stock", flex: 1, maxWidth: 150 },
    {
      field: "status",
      headerName: "Etat",
      flex: 1,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => params.row.status,
    },
    { field: "supplier", headerName: "Fournisseur", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const id = params.id as number;
        const isChecked = switchStates[id] ?? true;

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".5px",
            }}
          >
            <Switch
              checked={isChecked}
              onChange={() => handleSwitchChange(id)}
            />
            {!isChecked && (
              <Tooltip title="Commentaire de désactivation">
                <HelpOutlineOutlinedIcon color="info" />
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  const lowStockCount = dataGridProduct.filter(
    (product) => product.status.props.icon.type === ReportProblemOutlinedIcon,
  ).length;

  const outOfStockCount = dataGridProduct.filter(
    (product) => product.status.props.icon.type === CloseOutlinedIcon,
  ).length;

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    setSelectedRowId(
      selectionModel.length ? parseInt(selectionModel[0] as string, 10) : null,
    );
  };

  const handleModifyClick = () => {
    if (selectedRowId) {
      const selectedProdruct = data?.allProducts[selectedRowId - 1];
      if (selectedProdruct) {
        navigate(`/achat/produit/${selectedRowId}`);
      }
    } else {
      setSnackbarMessage("Veuillez sélectionner un produit à modifier.");
      setOpenSnackbar(true);
    }
  };

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
        Une erreur est survenue lors du chargement des données.
      </Typography>
    );

  if (data)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <DashboardSummary
          lowStockCount={lowStockCount}
          outOfStockCount={outOfStockCount}
        />
        <Box
          sx={{
            borderRadius: "5px",
            background: "#FFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "5px 5px 0px 0px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mt: 3,
                mb: 3,
                color: "#383E49",
              }}
            >
              Liste des produits
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  height: "40px",
                }}
              >
                Ajouter un produit
              </Button>
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  height: "40px",
                }}
                onClick={handleModifyClick}
              >
                Afficher le produit
              </Button>
            </Box>
          </Box>
          <DashboardList
            columns={columns}
            data={dataGridProduct}
            withSummary={true}
            onRowSelectionModelChange={handleRowSelection}
          />
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ marginTop: "1rem" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            sx={{
              width: "30rem",
              fontSize: "14px",
              padding: "1rem",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
}
