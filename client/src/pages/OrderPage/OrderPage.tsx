import { Box, Typography, Button } from "@mui/material";
import DashboardList from "../../components/DashboardList/DashboardList";
import { useGetOrderDetailsQuery } from "../../generated/graphql-types";

export default function OrdersDashboardPage() {
  const { data, loading, error } = useGetOrderDetailsQuery();

  const columns = [
    {
      field: "orderReference",
      headerName: "Référence de commande",
      width: 180,
    },
    { field: "supplier", headerName: "Fournisseur", width: 200 },
    { field: "status", headerName: "Statut", width: 150 },
    { field: "products", headerName: "Produits", width: 250 },
    { field: "created_at", headerName: "Création", width: 200 },
    { field: "total_quantity", headerName: "Quantité Totale", width: 200 },
    { field: "expectedDelivery", headerName: "Date de Livraison", width: 180 },
  ];

  // Prepare data for the DataGrid
  const dataGridOrders =
    data?.getOrderDetails?.map((order) => ({
      id: order.id,
      orderReference: order.id,
      supplier: order.products[0]?.supplierName,
      status: order.status,
      created_at: new Date(order.created_at).toLocaleDateString("fr-FR"), // Format date
      products: order.products.map((p) => p.productName).join(", "), // Combine product names
      total_quantity: order.products.reduce((sum, p) => sum + p.quantity, 0),
      expectedDelivery: new Date(
        Math.max(
          ...order.products.map((p) => new Date(p.expectedDelivery).getTime()),
        ),
      ).toLocaleDateString("fr-FR"), // Use the latest expected delivery date
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
          Liste des commandes
        </Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{
            height: "40px",
          }}
        >
          Ajouter une commande
        </Button>
      </Box>
      <DashboardList columns={columns} data={dataGridOrders} />
    </>
  );
}
