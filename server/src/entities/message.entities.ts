import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { MessageStatus } from "./message_status.entities";
import { User } from "./user.entities";
//import { GraphQLDate } from "graphql-scalars";

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

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => MessageStatus)
  @ManyToOne(() => MessageStatus, (MessageStatus) => MessageStatus.status)
  status: MessageStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
