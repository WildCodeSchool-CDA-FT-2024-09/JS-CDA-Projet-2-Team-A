import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      category
      product
      material
      color
      description
      min_quantity
      active
      commentary
      stock
      supplier {
        name
      }
    }
  }
`;

export const COUNT_CATGORIES = gql`
  query CountDistinctCategories {
    countDistinctCategories
  }
`;

export const COUNT_TOTAL_STOCK = gql`
  query totalStockProduct {
    totalStockProduct
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query ProductById($productByIdId: Int!) {
    productById(id: $productByIdId) {
      id
      product
      image
      material
      min_quantity
      category
      color
      employee {
        id
        name
        email
        phone_number
      }
      supplier {
        id
        name
      }
      description
      stock
    }
  }
`;
