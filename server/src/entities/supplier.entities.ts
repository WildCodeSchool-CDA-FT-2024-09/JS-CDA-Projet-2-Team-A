import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Product } from "./product.entities";
import { Employee } from "./employee.entities";

@ObjectType()
@Entity("supplier")
export class Supplier extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  logo: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  postcode: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  delay: number;

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field()
  @Column({ nullable: true })
  commentary?: string;

  @Field(() => Product)
  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @Field(() => Employee)
  @OneToMany(() => Employee, (employee) => employee.id)
  employees: Employee[];
}
