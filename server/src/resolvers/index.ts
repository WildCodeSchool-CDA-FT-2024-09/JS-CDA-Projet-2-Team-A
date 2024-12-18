import { NonEmptyArray } from "type-graphql";
import UserResolver from "./user.resolvers";
import ProductResolver from "./product.resolvers";
import RoleResolver from "./role.resolvers";
import MessageResolver from "./message.resolver";
import SupplierResolver from "./supplier.resolvers";

// Export individual resolvers
export {
  UserResolver,
  ProductResolver,
  RoleResolver,
  MessageResolver,
  SupplierResolver,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
  RoleResolver,
  MessageResolver,
  SupplierResolver,
];
