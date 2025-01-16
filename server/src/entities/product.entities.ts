import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Supplier } from "./supplier.entities";
import { Employee } from "./employee.entities";
import { OrderProduct } from "./order_product.entities";

@ObjectType()
@Entity("product")
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  product: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  material?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  commentary?: string;

  @Field()
  @Column()
  category: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  stock: number;

  @Field()
  @Column({ default: 10 })
  min_quantity: number;

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field(() => Supplier)
  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier;

  @Field(() => Employee)
  @ManyToOne(() => Employee, (employee) => employee.products)
  employee: Employee;

  @Field(() => [OrderProduct], { nullable: true })
  @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.product)
  orderProduct?: OrderProduct[];
}
