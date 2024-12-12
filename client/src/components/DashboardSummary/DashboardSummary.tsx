import { Box, Typography, Stack, Divider } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

export default function DashboardSummary() {
  return (
    <Box
      sx={{
        heigth: "100px",
        background: "#FFF",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mt: 1,
          mb: 3,
          color: "#383E49",
        }}
      >
        Inventaire global
      </Typography>
      <Box>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={15}
        >
          {/* first category */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <CategoryOutlinedIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#1570EF",
                }}
              >
                Catégories
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "#5D6679",
                fontWeight: "bold",
              }}
            >
              2
            </Typography>
          </Stack>

          {/* seconde category */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InventoryOutlinedIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#E19133",
                }}
              >
                Stock global
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography
                sx={{
                  color: "#5D6679",
                  fontWeight: "bold",
                }}
              >
                8868
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#5D6679",
                }}
              >
                Produits
              </Typography>
            </Stack>
          </Stack>

          {/* third category */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <ExitToAppOutlinedIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#845EBC",
                }}
              >
                En cours de livraison
              </Typography>
            </Stack>
            <Stack direction="row" spacing={10}>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    color: "#5D6679",
                    fontWeight: "bold",
                  }}
                >
                  2
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5D6679",
                  }}
                >
                  Commandes
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    color: "#5D6679",
                    fontWeight: "bold",
                  }}
                >
                  12
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5D6679",
                  }}
                >
                  Produits
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* third category */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <WarningAmberOutlinedIcon />
              <Typography sx={{ fontWeight: "bold", color: "#F36960" }}>
                Alertes
              </Typography>
            </Stack>
            <Stack direction="row" spacing={10}>
              <Stack spacing={2}>
                <Typography sx={{ color: "#5D6679", fontWeight: "bold" }}>
                  2
                </Typography>
                <Typography variant="body2" sx={{ color: "#5D6679" }}>
                  Catégories
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography sx={{ color: "#5D6679", fontWeight: "bold" }}>
                  12
                </Typography>
                <Typography variant="body2" sx={{ color: "#5D6679" }}>
                  Produits
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
