import { Product } from "../entities/product.entities";
import { Supplier } from "../entities/supplier.entities";
import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  Authorized,
} from "type-graphql";

@InputType()
class UpdateProductInput {
  @Field(() => String, { nullable: true })
  product?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  material?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int, { nullable: true })
  min_quantity?: number;

  @Field(() => Int, { nullable: true })
  stock?: number;

  @Field(() => Int, { nullable: true })
  supplierId?: number;
}

@Authorized(["achat", "approvisionnement", "atelier"])
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

  @Query(() => Product, { nullable: true })
  async productById(@Arg("id", () => Int) id: number): Promise<Product | null> {
    const product = await Product.findOne({
      where: { id },
      relations: {
        supplier: true,
        employee: true,
      },
    });

    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("data", () => UpdateProductInput) data: UpdateProductInput
  ): Promise<Product | null> {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      console.error("Produit introuvable :", id);
      throw new Error("Produit introuvable.");
    }

    if (data.supplierId) {
      const supplier = await Supplier.findOne({
        where: { id: data.supplierId },
      });
      if (!supplier) {
        throw new Error("Fournisseur introuvable.");
      }
      product.supplier = supplier;
    }

    Object.assign(product, data);

    await product.save();

    return product;
  }
}
