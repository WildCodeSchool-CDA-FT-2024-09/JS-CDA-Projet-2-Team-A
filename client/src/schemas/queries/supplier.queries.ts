import { gql } from "@apollo/client";

export const GET_SUPPLIERS_WITH_EMPLOYEES = gql`
  query SuppliersWithEmployees {
    getAllSuppliersWithEmployees {
      id
      name
      address
      city
      country
      employees {
        id
        name
        phone_number
        email
      }
    }
  }
`;

export const GET_SUPPLIERS_NAMES = gql`
  query GetSupplierName {
    getSupplierName {
      id
      name
    }
  }
`;
