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
import { Product } from "./product.entities";

@ObjectType()
@Entity("employee")
export class Employee extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone_number: string;

  @Field(() => Supplier)
  @ManyToOne(() => Supplier, (supplier) => supplier.employees)
  supplier: Supplier;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.employee)
  products?: Product[];
}
