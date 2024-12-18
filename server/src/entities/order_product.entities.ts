import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entities";
import { Product } from "./product.entities";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity("order_product")
export class OrderProduct extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (Order) => Order.orderProduct)
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, (Product) => Product.orderProduct)
  product: Product;
}
