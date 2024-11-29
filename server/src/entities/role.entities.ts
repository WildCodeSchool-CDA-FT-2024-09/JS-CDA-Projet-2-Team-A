import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // roles possibles : "achat" | "appro" | "atelier" | "admin"
  @Column()
  role: string;
}
