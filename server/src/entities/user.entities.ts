import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entities";
import { Message } from "./message.entities";
import { ObjectType, Field, Int } from "type-graphql";

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
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: "timestamp" })
  activationDate: Date;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @OneToMany(() => Message, (message) => message.id)
  messages: Message[];
}
