import { Resolver, Query, Int, ObjectType, Field } from "type-graphql";
import { Order } from "../entities/order.entities";
import { OrderStatus } from "../entities/order_status.entities";

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

@Resolver()
export class OrderResolver {
  // Query to get detailed order information including expected delivery dates
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
      created_at: order.created_at,
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
}
