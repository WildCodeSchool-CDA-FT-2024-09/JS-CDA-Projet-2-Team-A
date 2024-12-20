import { Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Message } from "../entities";

@Resolver(Message)
export default class MessageResolver {
  @Query(() => [Message])
  async getAllMessages(): Promise<Message[]> {
    const messages: Message[] = await Message.find({ relations: ["status"] });
    if (!messages) {
      throw new GraphQLError("Impossible de récupérer les tickets.");
    }
    return messages;
  }
}
