import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DashboardListProps<T> {
  columns: GridColDef[];
  data: Array<T>;
}

export default function DashboardList<T>({
  columns,
  data,
}: DashboardListProps<T>) {
  return (
    <Box component="main">
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
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            background: "#FFF",
            border: "none",
          }}
        />
      </Box>
    </Box>
  );
}
