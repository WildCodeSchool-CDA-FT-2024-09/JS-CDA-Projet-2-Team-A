import UserResolver from "./user.resolvers";
import ProductResolver from "./product.resolvers";
import RoleResolver from "./role.resolvers";
import { NonEmptyArray } from "type-graphql";
import { OrderResolver } from "./order.resolvers";

// Export individual resolvers
export { UserResolver, ProductResolver, RoleResolver, OrderResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
  RoleResolver,
  OrderResolver,
];
