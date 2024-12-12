import {
  Arg,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
  Ctx,
} from "type-graphql";
import { GraphQLError } from "graphql/error";
import { IncomingMessage, ServerResponse } from "http";
import { IsString } from "class-validator";
import { User } from "../entities/user.entities";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

interface GraphQLContext {
  req: IncomingMessage & { headers: { authorization?: string } };
  res: ServerResponse;
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
}

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
  login: string;

  @Field()
  role: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => AuthResponse)
  async authenticate(
    @Arg("credentials") credentials: Credentials,
    @Ctx() context: GraphQLContext
  ) {
    const { res } = context;
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
        const token = jwt.sign(
          { login: user.login, role: user.role.role },
          JWT_SECRET!,
          {
            expiresIn: "86400s",
          }
        );
        // token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict
        res.setHeader(
          "Set-Cookie",
          `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
        );
        return {
          token,
          name: user.name,
          login: user.login,
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
