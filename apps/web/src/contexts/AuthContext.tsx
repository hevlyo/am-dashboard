import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { 
  authControllerLogin, 
  authControllerRegister, 
  authControllerLogout, 
  authControllerRefresh 
} from "@repo/api-sdk";
import type { User } from "@repo/schemas";
import { setAccessToken } from "../services/api";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authControllerRefresh();
        setAccessToken(data.tokens.accessToken);
        setUser(data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await authControllerLogin({
      data: { email, password }
    });

    setAccessToken(data.tokens.accessToken);
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const data = await authControllerRegister({
        data: { name, email, password }
      });

      setAccessToken(data.tokens.accessToken);
      setUser(data.user);
    },
    [],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    authControllerLogout().catch((err: unknown) => {
      if (import.meta.env.DEV) {
        console.warn("[auth] Logout request failed", err);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
