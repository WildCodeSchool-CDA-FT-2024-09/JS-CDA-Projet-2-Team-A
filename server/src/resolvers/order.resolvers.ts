import { Resolver, Query, Int, ObjectType, Field } from "type-graphql";
import { Order } from "../entities/order.entities";

@ObjectType()
class OrderDetails {
  @Field(() => Int)
  id: number;

  @Field()
  status: string;

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
class EnCoursDeliveryStats {
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
        "orderProduct", // Corrected from "orderProducts"
        "orderProduct.product",
        "orderProduct.product.supplier",
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

  // Query to get stats for "en cours" deliveries
  @Query(() => EnCoursDeliveryStats)
  async getEnCoursDeliveryStats(): Promise<EnCoursDeliveryStats> {
    const deliveries = await Order.find({
      where: { status: "en cours" },
      relations: ["orderProduct"], // Use "orderProduct", not "orderProducts"
    });

    // Calculate stats
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
