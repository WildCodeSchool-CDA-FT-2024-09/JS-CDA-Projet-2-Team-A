import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplier } from "./supplier.entities";
import { Product } from "./product.entities";

@Entity("employee")
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.id)
  supplier: Supplier;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
