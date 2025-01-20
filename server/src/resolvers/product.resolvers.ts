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
  supplierId?: string;
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
      throw new Error("Produit introuvable.");
    }

    if (data.supplierId) {
      const supplier = await Supplier.findOne({
        where: { id: parseInt(data.supplierId) },
      });
      if (!supplier) {
        throw new Error("Fournisseur introuvable.");
      }
      product.supplier = supplier;
    }

    if (data.min_quantity !== undefined) {
      if (isNaN(data.min_quantity)) {
        throw new Error("La quantité minimale doit être un nombre valide.");
      }
      product.min_quantity = data.min_quantity;
    }

    if (data.stock !== undefined) {
      if (isNaN(data.stock)) {
        throw new Error("Le stock doit être un nombre valide.");
      }
      product.stock = data.stock;
    }

    Object.assign(product, data);

    await product.save();

    return product;
  }
}
