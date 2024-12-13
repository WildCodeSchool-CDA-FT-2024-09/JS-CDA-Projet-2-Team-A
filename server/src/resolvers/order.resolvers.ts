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
        "orderProducts",
        "orderProducts.product",
        "orderProducts.product.supplier",
      ],
    });

    return orders.map((order) => ({
      id: order.id,
      status: order.status,
      created_at: order.created_at,
      products: order.orderProducts.map((orderProduct) => {
        const product = orderProduct.product;
        const supplier = product.supplier;

        // Calculate expected delivery date: Add supplier's delay to the order's creation date
        const expectedDelivery = new Date(order.created_at); // Create a new date object from the order's creation date
        expectedDelivery.setDate(expectedDelivery.getDate() + supplier.delay); // Add the delay (in days) to the date

        return {
          productName: product.product, // Product name
          supplierName: supplier.name, // Supplier name
          quantity: orderProduct.quantity, // Product quantity
          expectedDelivery, // Calculated expected delivery date
        };
      }),
    }));
  }

  // Query to get stats for "en cours" deliveries
  @Query(() => EnCoursDeliveryStats)
  async getEnCoursDeliveryStats(): Promise<EnCoursDeliveryStats> {
    const deliveries = await Order.find({
      where: { status: "en cours" },
      relations: ["orderProducts"],
    });

    // Number of deliveries "en cours"
    const countDeliveries = deliveries.length;

    // Total number of products across all "en cours" deliveries
    const totalProducts = deliveries.reduce((sum, delivery) => {
      const deliveryProductsCount = delivery.orderProducts.reduce(
        (prodSum, orderProduct) => prodSum + orderProduct.quantity,
        0
      );
      return sum + deliveryProductsCount;
    }, 0);

    return { countDeliveries, totalProducts };
  }
}
