import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate($credentials: Credentials!) {
    authenticate(credentials: $credentials) {
      token
      name
      email
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      name
      email
      activationDate
      isActive
      role {
        role
      }
    }
  }
`;

export const WHOAMI = gql`
  query WhoAmI {
    whoAmI {
      name
      login
      role
    }
  }
`;
