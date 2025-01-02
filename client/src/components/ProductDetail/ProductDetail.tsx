import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  useProductByIdQuery,
  useUpdateProductMutation,
} from "../../generated/graphql-types";
import TabsProductGlobal from "../TabsProduct/TabsProduct";
import ModalForm from "../modalForm/Modalform";

export default function ProductDetail() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const productByIdId = 1; // TODO : A remplacer de manière dynamique après l'implémentation de la fonctionnalité de navigation pour arriver sur la page produit
  const { data, loading, error, refetch } = useProductByIdQuery({
    variables: { productByIdId },
  });

  const [updateProduct] = useUpdateProductMutation();

  const handleProductSubmit = async (formData: {
    product: string;
    description: string;
    category: string;
    material: string;
    color: string;
    min_quantity: number;
    stock: number;
    image?: string | File | null;
    supplier?: number;
  }) => {
    try {
      await updateProduct({
        variables: {
          id: productByIdId,
          data: formData,
        },
      });
      setSnackbarMessage("Produit modifié avec succès !");
      setOpenSnackbar(true);
      setOpenModal(false);
      await refetch();
    } catch {
      setSnackbarMessage(
        "Une erreur est survenur lors de la modification du produit.",
      );
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
        Une erreur s'est produite lors du chargement des données.
      </Typography>
    );

  console.info(snackbarMessage);
  console.info(openSnackbar);

  if (data)
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
            {data?.productById?.product}
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
          product={data?.productById?.product ?? ""}
          description={data?.productById?.description ?? ""}
          category={data?.productById?.category ?? ""}
          material={data?.productById?.material ?? ""}
          color={data?.productById?.color ?? ""}
          min_quantity={data?.productById?.min_quantity ?? 0}
          supplier={data?.productById?.supplier?.name ?? ""}
          employee={data?.productById?.employee?.name ?? ""}
          email_employee={data?.productById?.employee?.email ?? ""}
          phone_employee={data?.productById?.employee?.phone_number ?? ""}
          stock={data?.productById?.stock ?? 0}
          image={data?.productById?.image ?? ""}
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
              defaultValue: data?.productById?.image ?? "",
            },
            {
              name: "product",
              label: "Nom du produit",
              type: "text",
              defaultValue: data?.productById?.product ?? "",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              defaultValue: data?.productById?.description ?? "",
            },
            {
              name: "category",
              label: "Catégorie",
              type: "text",
              defaultValue: data?.productById?.category ?? "",
            },
            {
              name: "material",
              label: "Matériau",
              type: "text",
              defaultValue: data?.productById?.material ?? "",
            },
            {
              name: "color",
              label: "Couleur",
              type: "text",
              defaultValue: data?.productById?.color ?? "",
            },
            {
              name: "min_quantity",
              label: "Quantité minimale",
              type: "number",
              defaultValue: data?.productById?.min_quantity ?? 0,
            },
            {
              name: "stock",
              label: "Stock",
              type: "number",
              defaultValue: data?.productById?.stock ?? 0,
            },
            {
              name: "supplier",
              label: "ID du fournisseur",
              type: "number",
              defaultValue: data?.productById?.supplier?.id ?? 0,
            },
          ]}
        />
      </Box>
    );
}
