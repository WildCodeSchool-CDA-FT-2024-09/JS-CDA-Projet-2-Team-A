import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GetOrderDetails {
    getOrderDetails {
      id
      created_at
      products {
        productName
        quantity
        supplierName
        expectedDelivery
      }
      status {
        status
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
