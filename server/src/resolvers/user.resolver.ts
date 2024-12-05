import { GraphQLError } from "graphql";
import * as argon2 from "argon2";
import { randomBytes } from "crypto";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/user.entities";
import { Role } from "../entities/role.entities"; // Import the Role entity

@Resolver(User)
export default class UserResolver {
  @Mutation(() => String)
  async createUser(
    @Arg("name") name: string,
    @Arg("login") login: string,
    @Arg("roleName") roleName: string // Accept role name instead of role ID
  ): Promise<string> {
    try {
      // Step 1: Generate a cryptographically secure random password
      const passwordLength = 12;
      const randomPassword = this.generateRandomPassword(passwordLength);

      // Step 2: Hash the password with Argon2
      const hashedPassword = await argon2.hash(randomPassword);

      // Step 3: Check if the login is already in use
      const existingUser = await User.findOne({ where: { login } });
      if (existingUser) {
        throw new GraphQLError("Email already exists. Please use another.");
      }

      // Step 4: Find the role by its name
      const role = await Role.findOne({ where: { role: roleName } });
      if (!role) {
        throw new GraphQLError("Role not found. Please provide a valid role.");
      }

      // Step 5: Create the user entity
      const user = new User();
      user.name = name;
      user.login = login;
      user.password = hashedPassword;
      user.role = role; // Set the role using the role object

      // Step 6: Save the user to the database
      await user.save();

      // Step 7: Return the generated password (for use by the user or storing elsewhere)
      return randomPassword;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : "An error occurred",
        {
          extensions: {
            code: 400,
          },
        }
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
