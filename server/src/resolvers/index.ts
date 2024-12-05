import UserResolver from "./user.resolvers";
export { UserResolver };

import { NonEmptyArray } from "type-graphql";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [UserResolver];
