import { Product } from "../entities/product.entities";
import { Resolver, Query } from "type-graphql";

@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async allProducts() {
    const products = await Product.find({
      relations: {
        supplier: true,
      },
    });

    return products;
  }

  @Query(() => Number)
  async countDistinctCategories(): Promise<number> {
    const categoriesCount = await Product.createQueryBuilder("product")
      .select("COUNT(DISTINCT product.category)", "count")
      .getRawOne();

    return parseInt(categoriesCount.count, 10);
  }

  @Query(() => Number)
  async totalStockProduct(): Promise<number> {
    const totalStockProduct = await Product.createQueryBuilder("product")
      .select("SUM(product.stock)", "total")
      .getRawOne();

    return parseInt(totalStockProduct.total, 10) || 0;
  }
}
