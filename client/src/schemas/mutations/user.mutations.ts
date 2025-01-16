import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($body: CreateUserInput!) {
    createUser(body: $body)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
