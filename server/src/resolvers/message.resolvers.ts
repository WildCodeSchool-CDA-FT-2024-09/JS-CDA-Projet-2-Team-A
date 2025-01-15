import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { GraphQLError } from "graphql/index";
import { Message, MessageStatus, User } from "../entities";
import {
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
  validate,
} from "class-validator";
import { ServerResponse } from "http";

interface ContextType {
  res: ServerResponse;
  loggedUser: {
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
}

@InputType()
class newMessageBody {
  @Field()
  @IsString()
  @MinLength(4, {
    message: `Titre trop court, la longueur minimale est de $constraint1 caractères.`,
  })
  @MaxLength(30, {
    message: `Titre trop long, la longueur maximale est de $constraint1 caractères.`,
  })
  title: string;

  @Field()
  @IsString()
  @MinLength(4, {
    message: `Texte trop court, la longueur minimale est de $constraint1 caractères.`,
  })
  @MaxLength(140, {
    message: `Texte trop long, la Longueur maximale est de $constraint1 caractères.`,
  })
  message: string;
}

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

@Authorized(["achat", "atelier"])
@Resolver(Message)
export default class MessageResolver {
  @Query(() => [Message])
  async getAllMessages(): Promise<Message[]> {
    const messages: Message[] = await Message.find({
      order: { created_at: "DESC" },
    });
    if (!messages) {
      throw new GraphQLError("Impossible de récupérer les tickets.");
    }
    return messages;
  }

  @Authorized("atelier")
  @Mutation(() => String)
  async createMessage(
    @Arg("body") body: newMessageBody,
    @Ctx() context: ContextType
  ) {
    try {
      // Validation des données entrantes et gestion des erreurs.
      const errors = await validate(body);
      if (errors.length) {
        const formattedErrors = errors.flatMap((error) =>
          Object.values(error.constraints ?? {})
        );
        throw new GraphQLError("Données entrantes erronées", {
          extensions: { formattedErrors },
        });
      }
      const { loggedUser } = context;

      const status = await MessageStatus.findOne({
        where: { status: "En attente" },
      });
      if (!status) {
        throw new GraphQLError(
          "Impossible de récupérer le statut du ticket. Veuillez réessayer."
        );
      }

      const user = await User.findOne({
        where: { email: loggedUser.email },
      });
      if (!user) {
        throw new GraphQLError(
          "Impossible de récupérer votre identifiant. Veuillez réessayer."
        );
      }
      if (loggedUser.role !== "atelier") {
        throw new GraphQLError(
          "Vous n'êtes pas autorisé à créer un ticket. Veuillez réessayer."
        );
      }

      const newMessage = new Message();
      newMessage.title = body.title;
      newMessage.message = body.message;
      newMessage.status = status;
      newMessage.user = user;

      const result = await newMessage.save();
      return `Ticket ${result.title} créer avec succès.`;
    } catch (error) {
      if (!(error instanceof GraphQLError)) {
        throw new GraphQLError(
          "Une erreur est survenue lors de la création. Veuillez réessayer."
        );
      }
      throw error;
    }
  }

  @Authorized("achat")
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
