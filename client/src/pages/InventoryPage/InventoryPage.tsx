import DashboardList from "../../components/DashboardList/DashboardList";
import DashboardSummary from "../../components/DashboardSummary/DashboardSummary";
import { useAllProductsQuery } from "../../generated/graphql-types";
import { Box, Typography, Button } from "@mui/material";
export default function InventoryPage() {
  const { data, loading, error } = useAllProductsQuery();

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "category", headerName: "Catégorie", flex: 1, maxWidth: 250 },
    { field: "product", headerName: "Produit", flex: 1, maxWidth: 250 },
    { field: "material", headerName: "Matériau", flex: 1, maxWidth: 150 },
    { field: "color", headerName: "Couleur", flex: 1, maxWidth: 150 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "minimal", headerName: "Seuil", flex: 1, maxWidth: 150 },
    { field: "stock", headerName: "Stock", flex: 1, maxWidth: 150 },
    { field: "status", headerName: "Etat", flex: 1, maxWidth: 200 },
    { field: "supplier", headerName: "Fournisseur", flex: 1 },
  ];

  const dataGridProduct =
    data?.allProducts?.map((product, index) => ({
      id: index + 1,
      category: product.category,
      product: product.product,
      material: product.material,
      color: product.color,
      description: product.description,
      minimal: product.min_quantity,
      stock: product.stock,
      status: "En cours de calcul", // TODO : Affichage provisoire.
      supplier: product.supplier?.name,
    })) || [];

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
        Le site il est tout pété c'est trop long à charger là !!
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
        Le site il est tout pété, et en plus c'est bourré d'erreurs !!
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
        <DashboardSummary />
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
              >
                Modifier un produit
              </Button>
            </Box>
          </Box>
          <DashboardList columns={columns} data={dataGridProduct} />
        </Box>
      </Box>
    );
}
