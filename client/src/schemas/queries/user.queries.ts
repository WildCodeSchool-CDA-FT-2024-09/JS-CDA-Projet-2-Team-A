import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate($credentials: Credentials!) {
    authenticate(credentials: $credentials) {
      token
      name
      login
      role
    }
  }
`;
