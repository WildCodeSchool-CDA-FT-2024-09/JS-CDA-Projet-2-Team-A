import { createContext, FC, ReactNode, useContext, useState } from "react";

interface User {
  name: string;
  login: string;
  role: string;
}

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User>({
    name: "Doe",
    login: "john.doe@gmail.com",
    role: "4",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
