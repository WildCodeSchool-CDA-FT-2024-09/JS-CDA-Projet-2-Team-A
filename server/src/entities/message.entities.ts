import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entities";

@Entity("message")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  // statuts possibles : "pending" | "read" | "archived"
  @Column()
  message_status: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
