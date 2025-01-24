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
import redisClient from "../../redis.config";

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

@InputType()
class DisableProductInput {
  @Field(() => String, { nullable: true })
  commentary?: string;

  @Field(() => Boolean, { nullable: true })
  active?: boolean;
}

@Authorized(["achat", "approvisionnement", "atelier"])
@Resolver(Product)
export default class ProductResolver {
  @Query(() => [Product])
  async allProducts() {
    const cacheKey = `allProducts`;
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }

    const products = await Product.find({
      relations: {
        supplier: true,
      },
    });

    await redisClient.set(cacheKey, JSON.stringify(products), { EX: 60 });

    return products;
  }

  @Query(() => Number)
  async countDistinctCategories(): Promise<number> {
    const cacheKey = "countDistinctCategories";
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }
    const categoriesCount = await Product.createQueryBuilder("product")
      .select("COUNT(DISTINCT product.category)", "count")
      .getRawOne();

    await redisClient.set(
      cacheKey,
      JSON.stringify(parseInt(categoriesCount.count, 10)),
      { EX: 60 }
    );
    return parseInt(categoriesCount.count, 10);
  }

  @Query(() => Number)
  async totalStockProduct(): Promise<number> {
    const cacheKey = "totalStockProduct";
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }
    const totalStockProduct = await Product.createQueryBuilder("product")
      .select("SUM(product.stock)", "total")
      .getRawOne();

    await redisClient.set(
      cacheKey,
      JSON.stringify(parseInt(totalStockProduct.count, 10)),
      { EX: 60 }
    );
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

  @Mutation(() => Product, { nullable: true })
  async disableProduct(
    @Arg("id", () => Int) id: number,
    @Arg("data", () => DisableProductInput) data: DisableProductInput
  ): Promise<Product | null> {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error("Produit introuvable.");
    }

    if (data.commentary !== undefined) {
      product.commentary = data.commentary;
    }
    if (data.active !== undefined) {
      product.active = data.active;
    }

    await product.save();

    return product;
  }
}
