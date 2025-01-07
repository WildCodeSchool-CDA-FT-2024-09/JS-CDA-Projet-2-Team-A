import getSchema from "../../schema";
import { graphql, GraphQLSchema, print } from "graphql";
import gql from "graphql-tag";

const AUTHENTICATE = gql`
  query Authenticate($credentials: Credentials!) {
    authenticate(credentials: $credentials) {
      token
      name
      email
      role
    }
  }
`;

let schema: GraphQLSchema;

describe("authenticate query", () => {
  beforeAll(async () => {
    schema = await getSchema();
  });

  it("should return error if user not found", async () => {
    const input = {
      email: "inexistant@mockmail.com",
      password: "anything",
    };

    const context = {
      res: {
        setHeader: jest.fn(),
      },
    };

    const result = await graphql({
      schema,
      source: print(AUTHENTICATE),
      variableValues: { credentials: input },
      contextValue: context,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors?.[0].message).toBe(
      "User not found: no user with the specified email exists."
    );
  });

  it("should return error if password is incorrect", async () => {
    const input = {
      email: "gcasseldine2@example.com",
      password: "wrong_password",
    };

    const context = {
      res: {
        setHeader: jest.fn(),
      },
    };

    const result = await graphql({
      schema,
      source: print(AUTHENTICATE),
      variableValues: { credentials: input },
      contextValue: context,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors?.[0].message).toBe(
      "Incorrect password: the specified password does not match the one stored for this user."
    );
  });

  it("should return user data and cookie if credentials are correct", async () => {
    const input = {
      email: "gcasseldine2@example.com",
      password: "gD9{0eo?1",
    };

    const context = {
      res: {
        setHeader: jest.fn(),
      },
    };

    const result = await graphql({
      schema,
      source: print(AUTHENTICATE),
      variableValues: { credentials: input },
      contextValue: context,
    });

    expect(result.data).toHaveProperty("authenticate");
    expect(result.data!.authenticate).toMatchObject({
      token: expect.any(String),
      name: "Giles Casseldine",
      email: "gcasseldine2@example.com",
      role: "atelier",
    });

    const token = (result.data as { authenticate: { token: string } })
      .authenticate.token;
    expect(context.res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
    );
  });
});
