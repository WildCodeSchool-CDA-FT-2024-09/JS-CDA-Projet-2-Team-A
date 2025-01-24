import {
  Resolver,
  Query,
  Int,
  ObjectType,
  Field,
  Mutation,
  Arg,
  InputType,
  Authorized,
} from "type-graphql";
import { GraphQLError } from "graphql";
import { Order } from "../entities/order.entities";
import { OrderStatus } from "../entities/order_status.entities";
import { OrderProduct } from "../entities/order_product.entities";
import { Product } from "../entities/product.entities";
import { Supplier } from "../entities/supplier.entities";

@ObjectType()
class OrderDetails {
  @Field(() => Int)
  id: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  created_at: Date;

  @Field(() => [ProductDetails])
  products: ProductDetails[];
}

@ObjectType()
class ProductDetails {
  @Field()
  productName: string;

  @Field()
  supplierName: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  expectedDelivery: Date;
}

@ObjectType()
class InProgressDeliveryStats {
  @Field(() => Int)
  countDeliveries: number;

  @Field(() => Int)
  totalProducts: number;
}

@InputType()
class CreateOrderInput {
  @Field(() => [OrderItem])
  orderSelection: OrderItem[];
}

@InputType()
class OrderItem {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;
}

@Authorized(["achat", "approvisionnement", "atelier"])
@Resolver()
export class OrderResolver {
  // Query to get detailed order information including expected delivery dates
  @Authorized(["achat", "approvisionnement"])
  @Query(() => [OrderDetails])
  async getOrderDetails(): Promise<OrderDetails[]> {
    const orders = await Order.find({
      relations: [
        "orderProduct",
        "orderProduct.product",
        "orderProduct.product.supplier",
        "status",
      ],
    });

    return orders.map((order) => ({
      id: order.id,
      status: order.status,
      created_at: new Date(order.created_at),
      products: order.orderProduct.map((orderProduct) => {
        const product = orderProduct.product;
        const supplier = product.supplier;
        const expectedDelivery = new Date(order.created_at);
        expectedDelivery.setDate(expectedDelivery.getDate() + supplier.delay);

        return {
          productName: product.product,
          supplierName: supplier.name,
          quantity: orderProduct.quantity,
          expectedDelivery,
        };
      }),
    }));
  }

  @Query(() => InProgressDeliveryStats)
  async getInProgressDeliveryStats(): Promise<InProgressDeliveryStats> {
    // First find the "en livraison" status entity
    const orderStatus = await OrderStatus.findOne({
      where: { status: "En livraison" },
    });

    if (!orderStatus) {
      throw new Error("OrderStatus 'en livraison' not found");
    }

    const deliveries = await Order.find({
      where: { status: orderStatus },
      relations: ["orderProduct"],
    });

    const countDeliveries = deliveries.length;

    const totalProducts = deliveries.reduce((sum, delivery) => {
      const deliveryProductsCount = delivery.orderProduct.reduce(
        (prodSum, orderProduct) => prodSum + orderProduct.quantity,
        0
      );
      return sum + deliveryProductsCount;
    }, 0);
    return { countDeliveries, totalProducts };
  }

  @Authorized(["achat"])
  @Mutation(() => String)
  async createOrder(@Arg("body") body: CreateOrderInput): Promise<string> {
    const products = [];
    let supplier;

    for (const orderItem of body.orderSelection) {
      const product = await Product.findOne({
        where: { id: orderItem.productId },
        relations: { supplier: true },
      });

      if (!product) {
        throw new GraphQLError(
          `Impossible de récupérer le produit avec l'id : ${orderItem.productId}`
        );
      }

      if (
        products.length > 0 &&
        products[0].supplier.id !== product.supplier.id
      ) {
        throw new GraphQLError(
          `Tous les produits doivent être du même fournisseur.`
        );
      }

      if (!supplier) {
        supplier = product.supplier as Supplier;
      }

      products.push(product);
    }

    const order = new Order();
    order.created_at = new Date();
    order.status = (await OrderStatus.findOne({
      where: { status: "En attente" },
    })) as OrderStatus;
    order.supplier = supplier as Supplier;
    order.orderProduct = [];
    await order.save();

    body.orderSelection.map(async (orderItem) => {
      const orderProduct = new OrderProduct();
      orderProduct.order = order;
      const product = (await Product.findOne({
        where: { id: orderItem.productId },
      })) as Product;
      orderProduct.product = product;
      orderProduct.quantity = orderItem.quantity;
      await orderProduct.save();
    });

    return `Commande ${order.id} créée avec succès.`;
  }
}
