import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface DashboardListProps<T> {
  title: string;
  columns: GridColDef[];
  data: Array<T>;
}

export default function DashboardList<T>({
  title,
  columns,
  data,
}: DashboardListProps<T>) {
  return (
    <Box component="main">
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
          {title}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{
            height: "40px",
          }}
        >
          Ajouter un utilisateur
        </Button>
      </Box>
      <Box
        component="section"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
