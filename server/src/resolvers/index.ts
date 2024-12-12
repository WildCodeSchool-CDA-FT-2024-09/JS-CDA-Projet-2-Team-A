import UserResolver from "./user.resolvers";
import ProductResolver from "./product.resolvers";
import RoleResolver from "./role.resolvers";
import { NonEmptyArray } from "type-graphql";

// Export individual resolvers
export { UserResolver, ProductResolver, RoleResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
  RoleResolver,
];
