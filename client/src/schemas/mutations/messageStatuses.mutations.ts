import { gql } from "@apollo/client";

export const UPDATE_MESSAGE_STATUS = gql`
  mutation UpdateMessageStatus($body: updateStatusBody!) {
    updateMessageStatus(body: $body)
  }
`;
