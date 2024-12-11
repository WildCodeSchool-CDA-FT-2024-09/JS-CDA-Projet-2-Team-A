import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Role } from "./role.entities";
import { Message } from "./message.entities";

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  login: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: "timestamp" })
  activationDate: Date;

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  //@Field(() => Message)
  @OneToMany(() => Message, (message) => message.id)
  messages: Message[];
}
