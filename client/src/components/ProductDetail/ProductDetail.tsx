import { Box, Typography, Button } from "@mui/material";
import TabsProductGlobal from "../TabsProduct/TabsProduct";
import { useProductByIdQuery } from "../../generated/graphql-types";

export default function ProductDetail() {
  const productByIdId = 1;
  const { data, loading, error } = useProductByIdQuery({
    variables: { productByIdId },
  });

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
          product={data?.productById?.product}
          description={data?.productById?.description}
          category={data?.productById?.category}
          material={data?.productById?.material}
          color={data?.productById?.color}
          min_quantity={data?.productById?.min_quantity}
          supplier={data?.productById?.supplier?.name}
          employee={data?.productById?.employee?.name}
          email_employee={data?.productById?.employee?.email}
          phone_employee={data?.productById?.employee?.phone_number}
          stock={data?.productById?.stock}
        />
      </Box>
    );
}
