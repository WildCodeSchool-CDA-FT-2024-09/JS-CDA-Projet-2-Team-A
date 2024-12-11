import {
  BaseEntity,
  Column,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Product } from "./product.entities";

@ObjectType()
@Entity("order")
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column({ type: "timestamp" })
  created_at: Date;

  @Field(() => Product)
  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
