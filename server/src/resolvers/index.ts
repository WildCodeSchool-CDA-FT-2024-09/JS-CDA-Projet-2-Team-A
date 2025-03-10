import { NonEmptyArray } from "type-graphql";
import UserResolver from "./user.resolvers";
import ProductResolver from "./product.resolvers";
import RoleResolver from "./role.resolvers";
import { OrderResolver } from "./order.resolvers";
import MessageResolver from "./message.resolvers";
import MessageStatusResolver from "./messageStatus.resolvers";
import SupplierResolver from "./supplier.resolvers";

// Export individual resolvers
export {
  UserResolver,
  ProductResolver,
  RoleResolver,
  OrderResolver,
  MessageResolver,
  MessageStatusResolver,
  SupplierResolver,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
  RoleResolver,
  OrderResolver,
  MessageResolver,
  MessageStatusResolver,
  SupplierResolver,
];
