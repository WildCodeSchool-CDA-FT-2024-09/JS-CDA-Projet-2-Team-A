import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES_STATUSES = gql`
  query getAllMessageStatuses {
    getAllMessageStatuses {
      id
      status
    }
  }
`;
