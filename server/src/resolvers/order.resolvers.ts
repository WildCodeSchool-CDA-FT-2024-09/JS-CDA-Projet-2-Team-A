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
}
