import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api, setAccessToken } from "../services/api";
import type { User, AuthResponse } from "@repo/schemas";

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
        const { data } = await api.post<AuthResponse>("/auth/refresh");
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
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    setAccessToken(data.tokens.accessToken);
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const { data } = await api.post<AuthResponse>("/auth/register", {
        name,
        email,
        password,
      });

      setAccessToken(data.tokens.accessToken);
      setUser(data.user);
    },
    [],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    api.post("/auth/logout").catch((err) => {
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
