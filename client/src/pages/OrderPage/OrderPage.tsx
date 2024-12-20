import DashboardList from "../../components/DashboardList/DashboardList";
import DashboardSummary from "../../components/DashboardSummary/DashboardSummary";
import { useGetOrderDetailsQuery } from "../../generated/graphql-types";
import { Box, Typography, Button } from "@mui/material";

export default function OrdersDashboardPage() {
  const { data, loading, error } = useGetOrderDetailsQuery();

  const columns = [
    {
      field: "orderReference",
      headerName: "Référence de commande",
      flex: 1,
      maxWidth: 250,
    },
    { field: "supplier", headerName: "Fournisseur", flex: 1, maxWidth: 250 },
    { field: "status", headerName: "Statut", flex: 1, maxWidth: 150 },
    { field: "products", headerName: "Produits", flex: 1 },
    { field: "created_at", headerName: "Création", flex: 1, maxWidth: 150 },
    {
      field: "total_quantity",
      headerName: "Quantité Totale",
      flex: 1,
      maxWidth: 150,
    },
    {
      field: "expectedDelivery",
      headerName: "Date de Livraison",
      flex: 1,
      maxWidth: 200,
    },
  ];

  // Prepare data for the DataGrid
  const dataGridOrders =
    data?.getOrderDetails?.map((order) => ({
      id: order.id,
      orderReference: order.id,
      supplier: order.products[0]?.supplierName,
      status: order.status.status,
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
              Liste des commandes
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
                Ajouter une commande
              </Button>
            </Box>
          </Box>
          <DashboardList
            columns={columns}
            data={dataGridOrders}
            withSummary={true}
          />
        </Box>
      </Box>
    );
}
