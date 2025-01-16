import { buildSchema } from "type-graphql";
import { resolvers } from "./src/resolvers/index";

const getSchema = async () => {
  return await buildSchema({
    resolvers: resolvers,
    validate: true,
  });
};

export default getSchema;
