import { Box, Typography, Button } from "@mui/material";
import { useProductByIdQuery } from "../../generated/graphql-types";
import TabsProductGlobal from "../TabsProduct/TabsProduct";
// import ModalForm from "../modalForm/Modalform";

export default function ProductDetail() {
  // const [openModal, setOpenModal] = useState(false);
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");

  const productByIdId = 1; // TODO : A remplacer de manière dynamique après l'implémentation de la fonctionnalité de navigation pour arriver sur la page produit
  const { data, loading, error } = useProductByIdQuery({
    variables: { productByIdId },
  });

  // const [updateProduct] = useUpdateProductMutation();

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
          >
            Modifier
          </Button>
        </Box>
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
      </Box>
    );
}
