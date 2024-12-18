import { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import DashboardList from "../../components/DashboardList/DashboardList.tsx";
import { useSuppliersWithEmployeesQuery } from "../../generated/graphql-types.ts";

export default function SuppliersPage(): ReactElement {
  const { data } = useSuppliersWithEmployeesQuery();
  const columns = [
    { field: "name", headerName: "Fournisseur", flex: 1, maxWidth: 150 },
    { field: "address", headerName: "Adresse", flex: 1, maxWidth: 250 },
    { field: "city", headerName: "Ville", flex: 1, maxWidth: 100 },
    { field: "country", headerName: "Pays", flex: 1, maxWidth: 100 },
    {
      field: "employeeName",
      headerName: "Contact",
      flex: 1,
      maxWidth: 150,
    },
    { field: "employeePhone", headerName: "Téléphone", flex: 1, maxWidth: 150 },
    { field: "employeeEmail", headerName: "E-mail", flex: 1, maxWidth: 300 },
  ];
  const dataFormated =
    data?.getAllSuppliersWithEmployees?.map((supplier) => ({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      employeeName: supplier.employees[0].name,
      employeePhone: supplier.employees[0].phone_number,
      employeeEmail: supplier.employees[0].email,
    })) || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          background: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "0.6rem",
            borderRadius: "5px 5px 0px 0px",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              my: "1.5rem",
            }}
          >
            Fournisseurs
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "0.6rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                height: "2.5rem",
                textTransform: "none",
              }}
            >
              Nouveau fournisseur
            </Button>
          </Box>
        </Box>
        <DashboardList columns={columns} data={dataFormated} />
      </Box>
    </Box>
  );
}
