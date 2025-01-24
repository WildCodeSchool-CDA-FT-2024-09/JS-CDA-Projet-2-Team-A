import React, { useState } from "react";
import DashboardList from "../../components/DashboardList/DashboardList";
import DashboardSummary from "../../components/DashboardSummary/DashboardSummary";
import {
  Product,
  Supplier,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useSuppliersWithProductsQuery,
} from "../../generated/graphql-types";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Input,
} from "@mui/material";
import {
  columns,
  dataGridOrdersFunction,
  productsOfSupplier,
} from "./OrderPageUtils.ts";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { ApolloError } from "@apollo/client";
import { useUser } from "../../contexts/UserContext.tsx";

export default function OrdersDashboardPage() {
  const {
    user: { role },
  } = useUser();

  const [openModal, setOpenModal] = useState(false);

  // Pour gérer la sélection d'un fournisseur
  const [supplierSelected, setSupplierSelected] = useState<
    | {
        id: number;
        supplier: Supplier;
        products: Product[];
      }
    | undefined
  >(undefined);

  // Pour faire apparaitre le tableau des produits à commander
  const [orderTable, setOrderTable] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Pour gérer la commande en cours
  const [order, setOrder] = useState<(Product & { quantity?: number })[]>([]);

  const { data, refetch, loading, error } = useGetOrderDetailsQuery();
  const { data: SuppliersProducts } = useSuppliersWithProductsQuery();
  const [createOrderMutation] = useCreateOrderMutation();

  // Prepare data for the DataGrid
  const dataGridOrders = dataGridOrdersFunction(data);

  // Gère le changement du fournisseur via le select
  const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);

    setSupplierSelected({
      id,
      supplier: SuppliersProducts?.getAllSuppliersWithProducts?.find(
        (supplier) => supplier.id === id,
      ) as Supplier,
      products: productsOfSupplier(id, SuppliersProducts!),
    });
  };

  const handleOrderSelection = (selection: GridRowSelectionModel) => {
    const products = supplierSelected?.products.filter((product) =>
      selection.includes(product.id),
    );
    setOrder(products as Product[]);
  };

  // Vérifie si la quantité est valide et la rajoute dans l'ordre de commande
  const handleQuantityChange = (productId: number, value: string) => {
    const parsedValue = Number(value);
    if (!Number.isNaN(parsedValue) && parsedValue >= 0) {
      setOrder((prevOrder) =>
        prevOrder.map((product) =>
          product.id === productId
            ? { ...product, quantity: parsedValue }
            : product,
        ),
      );
    }
  };

  // Gère la création finale de la commande
  const handleOrder = async () => {
    try {
      const orderSelection = order.map((product) => ({
        productId: product.id,
        quantity: product.quantity!,
      }));
      const response = await createOrderMutation({
        variables: { body: { orderSelection } },
      });
      if (response?.data?.createOrder) {
        setOpenSnackbar(true);
        setSnackbarMessage(response.data.createOrder);
        await refetch();
        setOpenModal(false);
        setSupplierSelected(undefined);
        setOrderTable(false);
        setOrder([]);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        setOpenSnackbar(true);
        setSnackbarMessage(
          error.graphQLErrors.map((e) => e.message).join("\n"),
        );
      }
    }
  };

  // Gère l'annulation de la commande en cours dans la modale
  const handleCancelOrder = () => {
    setOpenModal(false);
    setSupplierSelected(undefined);
    setOrderTable(false);
    setOrder([]);
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
        Chargement en cours...
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
        <DashboardSummary lowStockCount={0} outOfStockCount={0} />
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
              {!orderTable ? "Liste des commandes" : "Création de commande"}
            </Typography>
            {role === "achat" && (
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
                  onClick={
                    supplierSelected
                      ? () => {
                          if (order.length) {
                            setOpenModal(true);
                          }
                        }
                      : () => setOrderTable(true)
                  }
                >
                  {supplierSelected ? "Suivant" : "Ajouter une commande"}
                </Button>
              </Box>
            )}
          </Box>
          {!orderTable && (
            <DashboardList
              columns={columns[0]}
              data={dataGridOrders}
              withSummary={true}
            />
          )}
          {orderTable && (
            <>
              <Box sx={{ display: "flex" }}>
                <TextField
                  select
                  id="supplierId"
                  name="supplier"
                  label="Fournisseur"
                  value={supplierSelected}
                  onChange={handleSupplierChange}
                  sx={{ m: 3, minWidth: "15rem", maxWidth: "fit-content" }}
                >
                  {SuppliersProducts?.getAllSuppliersWithProducts.map(
                    (supplier) => (
                      <MenuItem
                        divider={true}
                        value={supplier.id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant={"h6"}>{supplier.name}</Typography>
                        <Typography variant={"body1"}>
                          délai moyen : {supplier.delay} jours
                        </Typography>
                      </MenuItem>
                    ),
                  )}
                </TextField>
                {supplierSelected && (
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ alignSelf: "center", mt: 3, mb: 3, color: "#383E49" }}
                  >
                    {supplierSelected.supplier.description}
                  </Typography>
                )}
              </Box>
              {supplierSelected && (
                <Box component="div" sx={{}}>
                  <DashboardList
                    columns={columns[1]}
                    data={supplierSelected.products}
                    onRowSelectionModelChange={handleOrderSelection}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle sx={{ alignSelf: "center" }}>
            Choisissez les quantités à commander
          </DialogTitle>
          <DialogContent>
            {order &&
              order.map((product) => (
                <Box key={product.id} sx={{ m: "2rem" }}>
                  <DialogContentText>
                    <strong>{product.product}</strong>, en stock :{" "}
                    {product.stock}
                  </DialogContentText>
                  <Input
                    name="quantity"
                    placeholder="Quantités"
                    type="number"
                    value={product.quantity ?? ""}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />
                </Box>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelOrder} color="primary">
              Annuler
            </Button>
            <Button onClick={handleOrder} color="primary" variant="contained">
              Commander
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar displaying feedback*/}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={snackbarMessage.includes("succès") ? 3000 : 7000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ marginTop: "2rem" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarMessage.includes("succès") ? "success" : "error"}
            sx={{
              width: "25rem",
              fontSize: "1.125rem",
              padding: "1rem",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
}
