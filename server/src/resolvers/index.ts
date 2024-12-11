import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "../resolvers/user.resolvers";
export { UserResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [UserResolver];
