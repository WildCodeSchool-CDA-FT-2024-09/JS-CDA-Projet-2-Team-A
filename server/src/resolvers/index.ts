import UserResolver from "./user.resolvers";
import ProductResolver from "./product.resolvers";
export { UserResolver, ProductResolver };

import { NonEmptyArray } from "type-graphql";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  ProductResolver,
];
