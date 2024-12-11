import DashboardList from "../../components/DashboardList/DashboardList";
import { useAllProductsQuery } from "../../generated/graphql-types";
import { Box, Typography, Button } from "@mui/material";

export default function InventoryPage() {
  const { data, loading, error } = useAllProductsQuery();

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "category", headerName: "Catégorie", width: 200 },
    { field: "product", headerName: "Produit", width: 200 },
    { field: "material", headerName: "Matériau", width: 150 },
    { field: "color", headerName: "Couleur", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "minimal", headerName: "Seuil", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "status", headerName: "Etat", width: 200 },
    { field: "supplier", headerName: "Fournisseur", width: 200 },
  ];

  const dataGridProduct =
    data?.allProducts?.map(
      (product,
      (index) => ({
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
      })),
    ) || [];

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
      <>
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mt: 3,
              mb: 3,
            }}
          >
            Liste des produits
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{
              height: "40px",
            }}
          >
            Ajouter un produit
          </Button>
        </Box>
        <DashboardList columns={columns} data={dataGridProduct} />
      </>
    );
}
