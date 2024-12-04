import { Arg, Field, InputType, Query, Resolver } from "type-graphql";
import { IsString } from "class-validator";
import { User } from "../entities/user.entities";
import * as argon2 from "argon2";
import { GraphQLError } from "graphql/error";

@InputType()
class Credentials {
  @Field()
  @IsString()
  login: string;

  @Field()
  @IsString()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async authenticate(@Arg("credentials") credentials: Credentials) {
    const user = await User.findOne({
      where: {
        login: credentials.login,
      },
    });
    if (user) {
      const verified = await argon2.verify(user.password, credentials.password);
      if (verified) {
        return user;
      } else {
        throw new GraphQLError(
          "Incorrect password: the specified password does not match the one stored for this user."
        );
      }
    } else {
      throw new GraphQLError(
        "User not found: no user with the specified login exists."
      );
    }
  }
}
