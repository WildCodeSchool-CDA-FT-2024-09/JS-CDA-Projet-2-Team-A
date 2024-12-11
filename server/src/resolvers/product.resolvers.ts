import { Product } from "../entities/product.entities";
import { Resolver, Query } from "type-graphql";

@Resolver(Product)
export default class UseResolver {
  @Query(() => [Product])
  async allProducts() {
    const products = await Product.find({
      relations: {
        supplier: true,
      },
    });

    return products;
  }
}
