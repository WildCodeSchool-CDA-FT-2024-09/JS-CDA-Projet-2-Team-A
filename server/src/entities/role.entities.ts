import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("role")
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // roles possibles : "achat" | "approvisionnement" | "atelier" | "admin"
  @Field()
  @Column()
  role: string;
}
