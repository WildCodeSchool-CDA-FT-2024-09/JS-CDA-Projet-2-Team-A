import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import {
  useProductByIdQuery,
  useUpdateProductMutation,
  useGetSupplierNameQuery,
} from "../../generated/graphql-types";
import { uploadImage } from "../../services/uploadService";
import TabsProductGlobal from "../TabsProduct/TabsProduct";
import ModalForm from "../modalForm/Modalform";

export default function ProductDetail() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { id } = useParams<{ id: string }>();
  const productByIdId = parseInt(id || "0", 10);

  const {
    data: productByIdData,
    loading: productByIdLoading,
    error: productByIdError,
    refetch,
  } = useProductByIdQuery({
    variables: { productByIdId },
  });

  const {
    data: suppliersData,
    loading: suppliersLoading,
    error: suppliersError,
  } = useGetSupplierNameQuery();

  const [updateProduct] = useUpdateProductMutation();

  const handleProductSubmit = async (formData: {
    product: string;
    description: string;
    category: string;
    material: string;
    color: string;
    min_quantity: number;
    stock: number;
    image?: File | null | undefined;
    supplierId?: number;
  }) => {
    try {
      let imagePath: string | undefined = undefined;

      if (formData.image instanceof File) {
        imagePath = await uploadImage(formData.image);
      } else if (typeof formData.image === "string") {
        imagePath = formData.image;
      }

      await updateProduct({
        variables: {
          id: productByIdId,
          data: {
            ...formData,
            image: imagePath,
            supplierId: formData.supplierId,
          },
        },
      });
      setSnackbarMessage("Produit modifié avec succès !");
      setOpenSnackbar(true);
      setOpenModal(false);
      await refetch();
    } catch {
      setSnackbarMessage(
        "Une erreur est survenue lors de la modification du produit.",
      );
      setOpenSnackbar(true);
    }
  };

  if (productByIdLoading || suppliersLoading)
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

  if (productByIdError || suppliersError)
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

  if (productByIdData || suppliersData)
    return (
      <Box
        sx={{
          background: "#FFF",
          width: "100%",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "10px",
            paddingRight: "10px",
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
            {productByIdData?.productById?.product}
          </Typography>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              height: "40px",
            }}
            onClick={() => setOpenModal(true)}
          >
            Modifier
          </Button>
        </Box>

        {/* * Product Detail */}
        <TabsProductGlobal
          product={productByIdData?.productById?.product ?? ""}
          description={productByIdData?.productById?.description ?? ""}
          category={productByIdData?.productById?.category ?? ""}
          material={productByIdData?.productById?.material ?? ""}
          color={productByIdData?.productById?.color ?? ""}
          min_quantity={productByIdData?.productById?.min_quantity ?? 0}
          supplier={productByIdData?.productById?.supplier?.name ?? ""}
          employee={productByIdData?.productById?.employee?.name ?? ""}
          email_employee={productByIdData?.productById?.employee?.email ?? ""}
          phone_employee={
            productByIdData?.productById?.employee?.phone_number ?? ""
          }
          stock={productByIdData?.productById?.stock ?? 0}
          image={productByIdData?.productById?.image ?? ""}
        />

        {/* Modal for product modification */}
        <ModalForm
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleProductSubmit}
          mode="edit"
          showImageField={true}
          title="Modification du produit"
          imageFieldName="image"
          fields={[
            {
              name: "image",
              label: "Image de la catégorie",
              defaultValue: productByIdData?.productById?.image ?? "",
            },
            {
              name: "product",
              label: "Nom du produit",
              type: "text",
              defaultValue: productByIdData?.productById?.product ?? "",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              defaultValue: productByIdData?.productById?.description ?? "",
            },
            {
              name: "category",
              label: "Catégorie",
              type: "text",
              defaultValue: productByIdData?.productById?.category ?? "",
            },
            {
              name: "material",
              label: "Matériau",
              type: "text",
              defaultValue: productByIdData?.productById?.material ?? "",
            },
            {
              name: "color",
              label: "Couleur",
              type: "text",
              defaultValue: productByIdData?.productById?.color ?? "",
            },
            {
              name: "min_quantity",
              label: "Quantité minimale",
              type: "number",
              defaultValue: productByIdData?.productById?.min_quantity ?? 0,
            },
            {
              name: "stock",
              label: "Stock",
              type: "number",
              defaultValue: productByIdData?.productById?.stock ?? 0,
            },
            // TODO : Remplacer par le nom des fournisseurs, une fois que la page "Fournisseur" sera créé.
            {
              name: "supplierId",
              label: "Nom du fournisseur",
              type: "select",
              options:
                suppliersData?.getSupplierName.map((supplier) => ({
                  value: supplier.id.toString(),
                  label: supplier.name,
                })) ?? [],
              defaultValue: productByIdData?.productById?.supplier?.id ?? 0,
            },
          ]}
        />

        {/* Snackbar for Success/Error Feedback */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ marginTop: "2rem" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarMessage.includes("Erreur") ? "error" : "success"}
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
