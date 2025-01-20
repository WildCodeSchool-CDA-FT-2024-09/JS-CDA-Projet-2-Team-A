import {
  Arg,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
  Ctx,
  Mutation,
  Authorized,
} from "type-graphql";
import { AppDataSource } from "../db/data-source";
import { User } from "../entities/user.entities";
import { Role } from "../entities/role.entities";
import { GraphQLError } from "graphql";
import * as argon2 from "argon2";
import { randomBytes } from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import { IsString } from "class-validator";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET, MAIL_URL, LOGIN_PAGE_URL } = process.env;

interface GraphQLContext {
  req: IncomingMessage;
  res: ServerResponse;
  loggedUser?: {
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
}

@InputType()
class Credentials {
  @Field()
  @IsString()
  email: string;

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
  email: string;

  @Field()
  role: string;
}

@InputType()
class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  roleName: string;
}

@ObjectType()
class WhoAmIResponse {
  @Field()
  name: string;

  @Field()
  login: string;

  @Field()
  role: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => AuthResponse)
  async authenticate(
    @Arg("credentials") credentials: Credentials,
    @Ctx() context: GraphQLContext
  ) {
    const { res } = context;
    const user = await User.findOne({
      where: {
        email: credentials.email,
      },
      relations: {
        role: true,
      },
    });
    if (user) {
      const verified = await argon2.verify(user.password, credentials.password);
      if (verified) {
        const token = jwt.sign(
          { name: user.name, email: user.email, role: user.role.role },
          JWT_SECRET!,
          {
            expiresIn: "86400s",
          }
        );
        res.setHeader(
          "Set-Cookie",
          `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
        );
        return {
          token,
          name: user.name,
          email: user.email,
          role: user.role.role,
        };
      } else {
        throw new GraphQLError("Les identifiants sont incorrects.");
      }
    } else {
      throw new GraphQLError("Les identifiants sont incorrects.");
    }
  }

  @Authorized(["admin"])
  @Query(() => [User])
  async allUsers() {
    const users = await User.find({
      relations: {
        role: true,
      },
    });

    return users;
  }

  @Authorized(["admin"])
  @Mutation(() => String)
  async createUser(@Arg("body") body: CreateUserInput): Promise<string> {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      // Step 1: Generate a cryptographically secure random password
      const passwordLength = 12;
      const randomPassword = this.generateRandomPassword(passwordLength);

      // Step 2: Hash the password with Argon2
      const hashedPassword = await argon2.hash(randomPassword);

      // Step 3: Check if the email is already in use
      const existingUser = await User.findOne({ where: { email: body.email } });
      if (existingUser) {
        throw new GraphQLError("Email already exists. Please use another.");
      }

      // Step 4: Find the role by its name
      const role = await Role.findOne({ where: { role: body.roleName } });
      if (!role) {
        throw new GraphQLError("Role not found. Please provide a valid role.");
      }

      // Step 5: Create the user entity
      const user = new User();
      user.name = body.name;
      user.email = body.email;
      user.password = hashedPassword;
      user.role = role; // Set the role using the role object
      user.activationDate = new Date();

      // Step 6: Save the user to the database
      await user.save();

      const success = await fetch(`${MAIL_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: user.email,
          subject: "Première connexion",
          firstname: user.name,
          content: randomPassword,
          loginUrl: LOGIN_PAGE_URL,
        }),
      });
      if (success.status !== 200) {
        throw new GraphQLError(
          "Une erreur est survenue lors de l'envoi de l'e-mail."
        );
      }
      await queryRunner.commitTransaction();
      return success && "User created successfully.";
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new GraphQLError(
        error instanceof Error ? error.message : "An error occurred",
        {
          extensions: {
            code: 400,
          },
        }
      );
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => WhoAmIResponse)
  async whoAmI(@Ctx() context: GraphQLContext) {
    const user = context.loggedUser;
    if (user?.name && user?.email && user?.role) {
      return {
        name: user.name,
        login: user.email,
        role: user.role,
      };
    } else {
      throw new GraphQLError(
        "No user is properly authenticated (token missing or invalid, or context issue)."
      );
    }
  }

  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() context: GraphQLContext): Promise<string> {
    const user = context.loggedUser;
    if (user?.name && user?.email && user?.role) {
      const { res } = context;
      res.setHeader(
        "Set-Cookie",
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
      );
      return "Success : the token was properly deleted.";
    } else {
      throw new GraphQLError(
        "No user is properly authenticated (token missing or invalid, or context issue)."
      );
    }
  }

  // Function to generate a cryptographically secure random password
  private generateRandomPassword(length: number): string {
    // Generate random bytes using crypto
    const buffer = randomBytes(length);
    // Convert the buffer to a base64 string and slice it to the desired length
    const password = buffer.toString("base64").slice(0, length);
    // Optionally, replace certain characters for safety or readability
    return password.replace(/\+/g, "A").replace(/\//g, "B"); // Replace '+' and '/' with safer characters
  }
}
