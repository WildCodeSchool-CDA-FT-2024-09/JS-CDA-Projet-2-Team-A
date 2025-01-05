import {
  BaseEntity,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { OrderProduct } from "./order_product.entities";
import { OrderStatus } from "./order_status.entities";
import { Supplier } from "./supplier.entities";
//import { GraphQLDate } from "graphql-scalars";

@ObjectType()
@Entity("order")
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => OrderStatus)
  @ManyToOne(() => OrderStatus, (OrderStatus) => OrderStatus.status)
  status: OrderStatus;

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.order)
  orderProduct: OrderProduct[];

  @Field(() => Supplier)
  @ManyToOne(() => Supplier, (Supplier) => Supplier.order)
  supplier: Supplier;
}
