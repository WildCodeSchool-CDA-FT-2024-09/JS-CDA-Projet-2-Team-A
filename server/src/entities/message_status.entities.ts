import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Message } from "./message.entities";

@ObjectType()
@Entity("message_status")
export class MessageStatus extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // Statuts possibles : "En attente" | "Lu" | "Archivé"
  @Field()
  @Column()
  status: string;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (Message) => Message.status)
  messages?: Message[];
}
