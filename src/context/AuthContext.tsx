"use client";

import { decoderTokenSession } from "@/app/(app)/actions/user";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";

interface User {
  id: string;
  email?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  isLoadingUser: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUser = await decoderTokenSession();
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao recuperar o usuário:", error);
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
};
