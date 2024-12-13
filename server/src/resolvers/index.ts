import { NonEmptyArray } from "type-graphql";
import UserResolver from "./user.resolvers";
import ProductResolver from "./product.resolvers";
import RoleResolver from "./role.resolvers";
import MessageResolver from "../resolvers/message.resolver";

// Export individual resolvers
export { UserResolver, ProductResolver, RoleResolver, MessageResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
  RoleResolver,
  MessageResolver,
];
