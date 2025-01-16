import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useWhoAmIQuery } from "../generated/graphql-types";

interface User {
  name: string;
  login: string;
  role: string;
}

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User>({
    name: "",
    login: "",
    role: "",
  });
  const {
    data: loggedUserData,
    error: loggedUserError,
    loading,
  } = useWhoAmIQuery({
    variables: {},
  });
  useEffect(() => {
    if (!loggedUserError && loggedUserData) {
      setUser({
        name: loggedUserData!.whoAmI.name,
        login: loggedUserData!.whoAmI.login,
        role: loggedUserData!.whoAmI.role,
      });
    }
  }, [loggedUserData, loggedUserError]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Contexte non disponible");
  }
  return context;
};
