import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { Supplier } from "./supplier.entities";
import { Employee } from "./employee.entities";
import { Order } from "./order.entities";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column({ nullable: true })
  material?: string;

  @Column({ nullable: true })
  color?: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column()
  min_quantity: number;

  @Column()
  active: boolean;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable()
  suppliers?: Supplier[];

  @ManyToMany(() => Employee, (employee) => employee.products)
  @JoinTable()
  employees?: Employee[];

  @OneToMany(() => Order, (order) => order.id)
  orders?: Order[];
}
