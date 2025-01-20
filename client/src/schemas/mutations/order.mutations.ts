import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($body: CreateOrderInput!) {
    createOrder(body: $body)
  }
`;
