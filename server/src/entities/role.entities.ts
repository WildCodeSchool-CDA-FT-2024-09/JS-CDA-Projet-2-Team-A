import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity("role")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //"achat" | "appro" | "atelier" | "admin"
  @Column()
  role: string;
}
