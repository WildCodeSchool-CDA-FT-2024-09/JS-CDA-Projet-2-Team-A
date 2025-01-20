import { buildSchema } from "type-graphql";
import { resolvers } from "./src/resolvers/index";

const loggedUser = { name: "", email: "", role: "", iat: "", exp: "" };
const getSchema = async () => {
  return await buildSchema({
    resolvers: resolvers,
    validate: true,
    authChecker: (): boolean => {
      if (loggedUser) return true;
      return false;
    },
  });
};

export default getSchema;
