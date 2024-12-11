import { NonEmptyArray } from "type-graphql";
import { ExampleResolver } from "../resolvers/Example";
import { UserResolver } from "../resolvers/user.resolver";
import { RoleResolver } from "../resolvers/role.resolver";

// Export resolvers
export { ExampleResolver, UserResolver, RoleResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  ExampleResolver,
  UserResolver,
  RoleResolver,
];
