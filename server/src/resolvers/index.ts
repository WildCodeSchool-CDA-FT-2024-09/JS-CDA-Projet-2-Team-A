import { NonEmptyArray } from "type-graphql";
import { ExampleResolver } from "../resolvers/Example";
import { UserResolver } from "../resolvers/user.resolvers";
import { RoleResolver } from "./role.resolvers";

// Export resolvers
export { ExampleResolver, UserResolver, RoleResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  ExampleResolver,
  UserResolver,
  RoleResolver,
];
