import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "Prénom",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Nom",
    width: 150,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Login",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 360,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}@machineconstructor.com`,
  },
  {
    field: "service",
    headerName: "Service",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function UsersList() {
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
          Utilisateurs
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
          height: 400,
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
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
        />
      </Box>
    </Box>
  );
}
