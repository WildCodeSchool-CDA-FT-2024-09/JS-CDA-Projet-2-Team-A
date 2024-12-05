import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity("role")
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // roles possibles : "achat" | "appro" | "atelier" | "admin"
  @Field()
  @Column()
  role: string;
}
