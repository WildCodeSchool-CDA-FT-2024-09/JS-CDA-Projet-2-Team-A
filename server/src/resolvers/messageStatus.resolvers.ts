import { Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { MessageStatus } from "../entities";

@Resolver(MessageStatus)
export default class MessageStatusesResolver {
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
