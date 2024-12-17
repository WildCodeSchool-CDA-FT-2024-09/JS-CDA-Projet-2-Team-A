import { Box, Typography, Button } from "@mui/material";
import TabsProductGlobal from "../TabsProduct/TabsProduct";

export default function ProductDetail() {
  return (
    <Box
      sx={{
        background: "#FFF",
        width: "100%",
        borderRadius: "5px 5px 0px 0px",
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
          Câble Inox 4/35 mm
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
      <TabsProductGlobal />
    </Box>
  );
}
