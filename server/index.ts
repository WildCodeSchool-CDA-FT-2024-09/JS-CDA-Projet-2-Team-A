import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AppDataSource } from "./src/db/data-source";
import { resolvers } from "./src/resolvers/index";
import "reflect-metadata";
import "dotenv/config";
import * as jwt from "jsonwebtoken";

// -------------------------------------------------------------------
// console.info à virer avant merge
// -------------------------------------------------------------------

function parseCookies(cookieHeader: string | undefined) {
  if (!cookieHeader) return {};
  return cookieHeader
    .split(";")
    .reduce((cookies: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
      return cookies;
    }, {});
}

const { PORT, JWT_SECRET } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: resolvers,
    authChecker: ({ context }): boolean => {
      if (context.loggedUser) return true;
      return false;
    },
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      console.info(req.headers.cookie);

      if (!req.headers.cookie) return { res };

      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.token;

      console.info(token);

      if (!token) return { res };

      try {
        const payload = jwt.verify(token, JWT_SECRET as string);
        console.info(payload);
        return { res, loggedUser: payload };
      } catch (error) {
        console.info(error);
        return { res };
      }
    },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
