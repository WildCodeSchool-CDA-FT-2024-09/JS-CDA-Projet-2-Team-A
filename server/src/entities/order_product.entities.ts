import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Order } from "./order.entities";
import { Product } from "./product.entities";

@ObjectType()
@Entity("order_product")
export class OrderProduct extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Order) // Relates to the Order entity
  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @Field(() => Product) // Relates to the Product entity
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
