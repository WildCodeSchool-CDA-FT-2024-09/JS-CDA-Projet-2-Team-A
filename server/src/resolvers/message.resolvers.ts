import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql/index";
import { Message, MessageStatus } from "../entities";
import { IsEnum, IsNumber, IsString } from "class-validator";

@InputType()
class updateStatusBody {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  @IsEnum(["En attente", "Lu", "Archivé"])
  status: string;
}

@Resolver(Message)
export default class MessageResolver {
  @Query(() => [Message])
  async getAllMessages(): Promise<Message[]> {
    const messages: Message[] = await Message.find();
    if (!messages) {
      throw new GraphQLError("Impossible de récupérer les tickets.");
    }
    return messages;
  }

  @Mutation(() => String)
  async updateMessageStatus(@Arg("body") body: updateStatusBody) {
    try {
      const getMessage = await Message.findOne({
        where: { id: body.id },
      });

      if (!getMessage) {
        throw new GraphQLError(
          "Impossible de récupérer le ticket. Veuillez réessayer."
        );
      }
      const getStatus = await MessageStatus.findOne({
        where: { status: body.status },
      });

      if (!getStatus) {
        throw new GraphQLError(
          "Impossible de récupérer le nouveau statut. Veuillez réessayer."
        );
      }

      if (getMessage.status.status === getStatus.status) {
        return `Le ticket ${getMessage.title} a déjà le statut ${getStatus.status}.`;
      }

      getMessage.status = getStatus;
      await getMessage.save();
      return `Statut du ticket ${getMessage.title} modifié avec succès.`;
    } catch (error) {
      if (!(error instanceof GraphQLError)) {
        throw new GraphQLError("Une erreur est survenue. Veuillez réessayer.");
      }
      throw error;
    }
  }
}
