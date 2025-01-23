import { buildSchema } from "type-graphql";
import { resolvers } from "./src/resolvers/index";

const getSchema = async () => {
  return await buildSchema({
    resolvers: resolvers,
    validate: true,
    authChecker: () => {
      return true;
    },
  });
};

export default getSchema;
