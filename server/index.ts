import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AppDataSource } from "./src/db/data-source";
import { resolvers } from "./src/resolvers/index";
import "reflect-metadata";
import "dotenv/config";

const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: resolvers,
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      return { req, res };
    },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
