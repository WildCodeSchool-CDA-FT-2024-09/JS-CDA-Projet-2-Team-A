import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES = gql`
  query GetAllMessages {
    getAllMessages {
      id
      title
      message
      status {
        status
      }
    }
  }
`;
