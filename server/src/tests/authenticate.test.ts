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
let context: { res: { setHeader: jest.Mock } };

const createContext = () => ({
  res: {
    setHeader: jest.fn(),
  },
});

describe("authenticate query", () => {
  beforeAll(async () => {
    schema = await getSchema();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    context = createContext();
  });

  it("should return error if user not found", async () => {
    const input = {
      email: "inexistant@mockmail.com",
      password: "anything",
    };

    const result = await graphql({
      schema,
      source: print(AUTHENTICATE),
      variableValues: { credentials: input },
      contextValue: context,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors?.[0].message).toBe(
      "Les identifiants sont incorrects."
    );
  });

  it("should return error if password is incorrect", async () => {
    const input = {
      email: "gcasseldine2@example.com",
      password: "wrong_password",
    };

    const result = await graphql({
      schema,
      source: print(AUTHENTICATE),
      variableValues: { credentials: input },
      contextValue: context,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors?.[0].message).toBe(
      "Les identifiants sont incorrects."
    );
  });

  it("should return user data and cookie if credentials are correct", async () => {
    const input = {
      email: "gcasseldine2@example.com",
      password: "gD9{0eo?1",
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
