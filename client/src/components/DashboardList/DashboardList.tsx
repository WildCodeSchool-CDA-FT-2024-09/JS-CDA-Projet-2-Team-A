import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import useScreenSize from "../../hook/useScreenSize";

interface DashboardListProps<T> {
  columns: GridColDef[];
  data: Array<T>;
  withSummary?: boolean;
  onRowSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
}

export default function DashboardList<T>({
  columns,
  data,
  withSummary = false,
  onRowSelectionModelChange,
}: DashboardListProps<T>) {
  const { dataGridHeight, rowPerPage } = useScreenSize({
    withSummary,
  });

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
            onRowSelectionModelChange={onRowSelectionModelChange}
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
