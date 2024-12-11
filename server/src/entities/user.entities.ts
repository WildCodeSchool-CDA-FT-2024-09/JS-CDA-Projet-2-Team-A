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
import { Field, ObjectType } from "type-graphql";

@Entity("user")
@ObjectType() // Marks this class as a GraphQL Object type
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field() // Exposes this column to GraphQL
  id: number;

  @Column()
  @Field() // Exposes this column to GraphQL
  name: string;

  @Column({ unique: true })
  @Field() // Exposes this column to GraphQL
  login: string;

  @Column()
  @Field() // Exposes this column to GraphQL
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field() // Exposes this column to GraphQL
  date: Date;

  @Column({ unique: true })
  @Field() // Exposes this column to GraphQL
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true }) // Exposes this column to GraphQL, nullable
  phoneNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true }) // Exposes this column to GraphQL, nullable
  profilePicture: string; // URL or file path to the user's profile picture

  @Column({ default: true })
  @Field() // Exposes this column to GraphQL
  isActive: boolean; // Indicates whether the user account is active

  @Column({ type: "timestamp", nullable: true })
  @Field({ nullable: true }) // Exposes this column to GraphQL, nullable
  lastLogin: Date; // Stores the last login date and time

  @ManyToOne(() => Role, (role) => role.id)
  @Field(() => Role) // Exposes the related Role entity to GraphQL
  role: Role;

  @OneToMany(() => Message, (message) => message.id)
  @Field(() => [Message], { nullable: true }) // Exposes related messages to GraphQL
  messages: Message[];
}
