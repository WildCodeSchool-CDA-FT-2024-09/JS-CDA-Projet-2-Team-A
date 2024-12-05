import {
  Arg,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { GraphQLError } from "graphql/error";
import { IsString } from "class-validator";
import { User } from "../entities/user.entities";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

@InputType()
class Credentials {
  @Field()
  @IsString()
  login: string;

  @Field()
  @IsString()
  password: string;
}

@ObjectType()
class AuthResponse {
  @Field()
  token: string;

  @Field()
  name: string;

  @Field()
  role: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => AuthResponse)
  async authenticate(@Arg("credentials") credentials: Credentials) {
    const user = await User.findOne({
      where: {
        login: credentials.login,
      },
      relations: {
        role: true,
      },
    });
    if (user) {
      const verified = await argon2.verify(user.password, credentials.password);
      if (verified) {
        return {
          token: jwt.sign(
            { login: user.login, role: user.role.role },
            JWT_SECRET!,
            {
              expiresIn: "86400s",
            }
          ),
          name: user.name,
          role: user.role.role,
        };
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
