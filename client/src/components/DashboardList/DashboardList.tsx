import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useScreenSize from "../../hook/useScreenSize";

interface DashboardListProps<T> {
  columns: GridColDef[];
  data: Array<T>;
}

export default function DashboardList<T>({
  columns,
  data,
}: DashboardListProps<T>) {
  const { isSmallScreen, isMediumScreen } = useScreenSize();

  const rowPerPage = isSmallScreen ? 5 : isMediumScreen ? 10 : 19;

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
                pageSize: rowPerPage,
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
