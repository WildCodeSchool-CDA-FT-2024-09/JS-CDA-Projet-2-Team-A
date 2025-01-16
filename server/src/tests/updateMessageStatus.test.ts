import getSchema from "../../schema";
import { graphql, GraphQLSchema, print } from "graphql";
import gql from "graphql-tag";
import { Message } from "../entities";

const UPDATE_MESSAGE_STATUS = gql`
  mutation UpdateMessageStatus($body: updateStatusBody!) {
    updateMessageStatus(body: $body)
  }
`;

let schema: GraphQLSchema;

describe("Update the status of one ticket", () => {
  beforeAll(async () => {
    schema = await getSchema();
  });

  it("should successfully update the status of a ticket", async () => {
    const getMessage = (await Message.findOne({
      where: { id: 1 },
    })) as Message;

    const ticketInput = {
      id: getMessage.id,
      status: getMessage.status.status === "Lu" ? "En attente" : "Lu",
    };

    const result = await graphql({
      schema,
      source: print(UPDATE_MESSAGE_STATUS),
      variableValues: { body: ticketInput },
    });

    const updatedStatus = result?.data?.updateMessageStatus as string;

    expect(updatedStatus).toBeDefined();
    expect(typeof updatedStatus).toBe("string");
    expect(updatedStatus).toBe(
      `Statut du ticket ${getMessage.title} modifié avec succès.`
    );
  });

  it("should fail when updating the status of a ticket with an invalid status", async () => {
    const ticketInput = {
      id: 1,
      status: "Toto",
    };

    const result = await graphql({
      schema,
      source: print(UPDATE_MESSAGE_STATUS),
      variableValues: { body: ticketInput },
    });

    const updatedStatus = result?.data;

    expect(updatedStatus).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0].message).toBe("Argument Validation Error");
  });

  it("should fail when updating the status of a ticket with an invalid id", async () => {
    const ticketInput = {
      id: 0,
      status: "Archivé",
    };

    const result = await graphql({
      schema,
      source: print(UPDATE_MESSAGE_STATUS),
      variableValues: { body: ticketInput },
    });

    const updatedStatus = result?.data;

    expect(updatedStatus).toBeNull();
    expect(result?.errors?.[0]?.message).toBe(
      "Impossible de récupérer le ticket. Veuillez réessayer."
    );
  });

  it("should fail when updating the status of a ticket with the same status", async () => {
    const getMessage = (await Message.findOne({
      where: { id: 1 },
    })) as Message;

    const ticketInput = {
      id: 1,
      status: getMessage.status.status,
    };

    const result = await graphql({
      schema,
      source: print(UPDATE_MESSAGE_STATUS),
      variableValues: { body: ticketInput },
    });

    const updatedStatus = result?.data?.updateMessageStatus as string;

    expect(updatedStatus).toBeDefined();
    expect(typeof updatedStatus).toBe("string");
    expect(updatedStatus).toBe(
      `Le ticket ${getMessage.title} a déjà le statut ${getMessage.status.status}.`
    );
  });
});
