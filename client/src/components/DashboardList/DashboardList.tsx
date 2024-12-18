import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
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

  const rowPerPage = isSmallScreen ? 7 : isMediumScreen ? 12 : 26;
  const dataGridHeight = isSmallScreen
    ? "473px"
    : isMediumScreen
      ? "734px"
      : "1461px";

  return (
    <Box component="main">
      <Box
        component="section"
        sx={{
          height: dataGridHeight,
          width: "100%",
        }}
      >
        {data.length ? (
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
        ) : (
          <Typography variant="h6" component="h3">
            Aucune donnée à afficher.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
