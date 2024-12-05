import { NonEmptyArray } from "type-graphql";
import { ExampleResolver } from "../resolvers/Example";

export { ExampleResolver };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const resolvers: NonEmptyArray<Function> = [ExampleResolver];
