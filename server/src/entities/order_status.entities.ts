import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Order } from "./order.entities";

@ObjectType()
@Entity("order_status")
export class OrderStatus extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // Statuts possibles : "En attente" | "Validée" | "En livraison" | "Retard fournisseur" | "Retard transporteur" | "Reliquat" | "Complète" | "Annulée"
  @Field()
  @Column()
  status: string;

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (Order) => Order.status)
  orders?: Order[];
}
