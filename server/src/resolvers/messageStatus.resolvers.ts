import { Authorized, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { MessageStatus } from "../entities";

@Authorized(["achat", "atelier"])
@Resolver(MessageStatus)
export default class MessageStatusResolver {
  @Query(() => [MessageStatus])
  async getAllMessageStatuses(): Promise<MessageStatus[]> {
    const statuses: MessageStatus[] = await MessageStatus.find();
    if (!statuses) {
      throw new GraphQLError(
        "Impossible de récupérer les statuts des tickets."
      );
    }
    return statuses;
  }
}
