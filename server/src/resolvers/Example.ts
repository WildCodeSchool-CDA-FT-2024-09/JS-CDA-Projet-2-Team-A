import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Column } from "typeorm";
import { IsString } from "class-validator";
import { Example } from "../entities/index";
import { GraphQLError } from "graphql/error";

@InputType()
class newExampleInput {
  @Field()
  @IsString()
  @Column({ unique: true })
  name: string;
}

@Resolver(Example)
export class ExampleResolver {
  @Query(() => [Example])
  async getAllExamples(): Promise<Example[]> {
    const examples = await Example.find();
    return examples;
  }

  @Mutation(() => String)
  async newExample(@Arg("body") body: newExampleInput): Promise<string> {
    const example = await Example.findOneBy({ name: body.name });
    if (example !== null) {
      throw new GraphQLError("Exemple déjà existant.");
    }

    const newExample = new Example();
    newExample.name = body.name;
    await newExample.save();

    return newExample.name;
  }
}
