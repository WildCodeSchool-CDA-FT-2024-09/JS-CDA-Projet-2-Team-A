import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Message,
  UpdateMessageStatusMutation,
  UpdateMessageStatusMutationFn,
  useGetAllMessagesQuery,
  useUpdateMessageStatusMutation,
} from "../generated/graphql-types.ts";

// Typage d'un ticket
type MessageInContext = Pick<Message, "id" | "title" | "message"> & {
  createdAt: string;
  status: string;
};

// Typage du contexte
interface MessageContextType {
  messages: MessageInContext[] | undefined;
  loadingMessages: boolean;
  errorMessages: Error | undefined;
  refetchAllMessages: () => void;
  updateMessageStatusMutation: UpdateMessageStatusMutationFn;
  updateValidation: UpdateMessageStatusMutation | undefined | null;
  updateError: Error | undefined;
  getMessageById: (id: number) => MessageInContext;
  idForModal: number | null;
  setIdForModal: Dispatch<SetStateAction<number | null>>;
}

// Création du contexte
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Création du provider pour le contexte
export const MessageProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const {
    data,
    loading: loadingMessages,
    error: errorMessages,
    refetch: refetchAllMessages,
  } = useGetAllMessagesQuery();
  const [
    updateMessageStatusMutation,
    { data: updateValidation, error: updateError },
  ] = useUpdateMessageStatusMutation();
  const [idForModal, setIdForModal] = useState<number | null>(null);

  // Récupération des datas et mise à jour automatique.
  const messages = useMemo(() => {
    return data?.getAllMessages.map((message) => ({
      id: message.id,
      title: message.title,
      createdAt: new Date(message.createdAt).toLocaleDateString("fr-FR"),
      message: message.message,
      status: message.status.status,
    }));
  }, [data]);

  /**
   * Récupération d'un ticket par son id depuis le contexte.
   * @param id : number - id du ticket à récupérer.
   */
  const getMessageById = (
    id: number,
  ): {
    id: number;
    title: string;
    createdAt: string;
    message: string;
    status: string;
  } => {
    return messages!.find((message) => message.id === id)!;
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        loadingMessages,
        errorMessages,
        refetchAllMessages,
        updateMessageStatusMutation,
        updateValidation,
        updateError,
        getMessageById,
        idForModal,
        setIdForModal,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("Erreur lors de l'utilisation du contexte MessageContext");
  }
  return context;
};
