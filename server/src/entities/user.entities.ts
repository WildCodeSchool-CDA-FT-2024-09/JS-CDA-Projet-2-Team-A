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

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamptz" })
  activationDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @OneToMany(() => Message, (message) => message.id)
  messages: Message[];
}
