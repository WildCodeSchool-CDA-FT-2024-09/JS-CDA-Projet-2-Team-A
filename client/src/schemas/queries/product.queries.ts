import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      category
      product
      material
      color
      description
      min_quantity
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
