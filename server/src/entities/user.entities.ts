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
import { GraphQLDate } from "graphql-scalars";

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
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => GraphQLDate)
  @Column({ type: "date" })
  activationDate: Date;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Role, { nullable: false })
  @ManyToOne(() => Role, (role) => role.role)
  role: Role;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];
}
