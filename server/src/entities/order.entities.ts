import {
  BaseEntity,
  Column,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entities";

@Entity("order")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
