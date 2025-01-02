import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      id
      product
      description
      category
      material
      color
      image
      min_quantity
      stock
      supplier {
        id
        name
      }
    }
  }
`;
