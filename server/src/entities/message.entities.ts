import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entities";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("message")
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column({ type: "timestamp" })
  created_at: Date;

  // statuts possibles : "En attente" | "Lu" | "Archivé"
  @Field()
  @Column()
  message_status: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
