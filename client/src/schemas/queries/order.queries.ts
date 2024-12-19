import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GetOrderDetails {
    getOrderDetails {
      id
      status
      created_at
      products {
        productName
        supplierName
        quantity
        expectedDelivery
      }
    }
  }
`;

export const GET_PENDING_DELIVERIES_STATS = gql`
  query GetInprogressDeliveryStats {
    getInProgressDeliveryStats {
      countDeliveries
      totalProducts
    }
  }
`;
