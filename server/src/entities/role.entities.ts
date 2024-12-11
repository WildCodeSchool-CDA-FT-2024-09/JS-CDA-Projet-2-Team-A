import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("role")
export class Role extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  // roles possibles : "achat" | "appro" | "atelier" | "admin"
  @Field()
  @Column()
  role: string;
}
