import getSchema from "../../schema";
import { graphql, GraphQLSchema, print } from "graphql";
import gql from "graphql-tag";
import { User } from "../entities/user.entities";

// Define mutation string
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($body: CreateUserInput!) {
    createUser(body: $body)
  }
`;

let schema: GraphQLSchema;

describe("CreateUser Mutation with Role Name", () => {
  beforeAll(async () => {
    schema = await getSchema(); // Initialize schema
  });

  it("should successfully create a user with a valid role name and return a generated password", async () => {
    const userInput = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      roleName: "admin", // Ensure 'admin' role is pre-seeded in DB
    };

    const result = await graphql({
      schema,
      source: print(CREATE_USER_MUTATION),
      variableValues: { body: userInput },
    });

    const generatedPassword = result?.data?.createUser as string;

    expect(generatedPassword).toBeDefined();
    expect(typeof generatedPassword).toBe("string");
    expect(generatedPassword.length).toBeGreaterThan(0);

    const user = await User.findOne({
      where: { email: userInput.email },
      relations: ["role"], // Assuming the user has a 'role' relation
    });

    expect(user).not.toBeNull();
    if (user) {
      expect(user.name).toBe(userInput.name);
      expect(user.email).toBe(userInput.email);
      expect(user.role.role).toBe(userInput.roleName); // Ensure user role matches
      expect(user.password).not.toBe(generatedPassword); // Ensure password is hashed
    }
  });

  it("should fail when creating a user with an invalid role name", async () => {
    const userInput = {
      name: "Alice Brown",
      email: "alice.brown@example.com",
      roleName: "invalid_role", // Invalid role that shouldn't exist in the database
    };

    const result = await graphql({
      schema,
      source: print(CREATE_USER_MUTATION),
      variableValues: { body: userInput },
    });

    const errors = result.errors;
    expect(errors).toBeDefined();
    if (errors) {
      expect(errors[0].message).toBe(
        "Role not found. Please provide a valid role."
      );
    }
  });

  it("should fail when creating a user with a duplicate email", async () => {
    const userInput = {
      name: "John Smith",
      email: "jane.doe@example.com", // This email should already exist in the database
      roleName: "admin",
    };

    const result = await graphql({
      schema,
      source: print(CREATE_USER_MUTATION),
      variableValues: { body: userInput },
    });

    const errors = result.errors;
    expect(errors).toBeDefined();
    if (errors) {
      expect(errors[0].message).toBe(
        "Email already exists. Please use another."
      );
    }
  });
});
