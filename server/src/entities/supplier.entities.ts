import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { Product } from "./product.entities";
import { Employee } from "./employee.entities";

@Entity("supplier")
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  postcode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  delay: number;

  @Column()
  active: boolean;

  @ManyToMany(() => Product, (product) => product.suppliers)
  products?: Product[];

  @OneToMany(() => Employee, (employee) => employee.id)
  employees?: Employee[];
}
