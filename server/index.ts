import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AppDataSource } from "./src/db/data-source";
import { resolvers } from "./src/resolvers/index";
import redisClient from "./redis.config";
import "reflect-metadata";
import "dotenv/config";
import * as jwt from "jsonwebtoken";

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
  try {
    await redisClient.connect();
    console.info("Connecté au cache Redis !");
  } catch (error) {
    console.error("Erreur de connexion au cache Redis :", error);
    return;
  }
  const schema = await buildSchema({
    resolvers: resolvers,
    authChecker: ({ context }, roles): boolean => {
      if (roles.length > 0)
        return roles.some((role) => context.loggedUser.role === role);
      if (context.loggedUser) return true;
      return false;
    },
  });

  const server = new ApolloServer({
    schema,
    formatError: (formattedError, error) => {
      if ((error as Error).message.startsWith("Access denied")) {
        return {
          message: "Vous n'êtes pas autorisé à effectuer cette action.",
        };
      }
      return formattedError;
    },
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      if (!req.headers.cookie) return { res };

      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.token;

      if (!token) return { res };

      try {
        const payload = jwt.verify(token, JWT_SECRET as string);
        return { res, loggedUser: payload };
      } catch {
        return { res };
      }
    },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
