import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { MessageStatus } from "./message_status.entities";
import { User } from "./user.entities";

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

  @Field(() => MessageStatus)
  @ManyToOne(() => MessageStatus, (MessageStatus) => MessageStatus.status, {
    eager: true,
  })
  status: MessageStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
