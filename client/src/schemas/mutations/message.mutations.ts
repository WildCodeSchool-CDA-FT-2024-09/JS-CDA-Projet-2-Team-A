import { gql } from "@apollo/client";

export const UPDATE_MESSAGE_STATUS = gql`
  mutation CreateMessage($body: newMessageBody!) {
    createMessage(body: $body)
  }
`;
