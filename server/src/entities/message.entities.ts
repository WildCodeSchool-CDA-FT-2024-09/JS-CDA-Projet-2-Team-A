import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

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

  //"pending" | "read" | "archived"
  @Column()
  message_status: string;
}
