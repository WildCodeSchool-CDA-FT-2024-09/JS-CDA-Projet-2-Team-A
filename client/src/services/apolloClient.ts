import { ApolloClient, InMemoryCache } from "@apollo/client";

// APOLLO CLIENT INSTANCE
export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});
