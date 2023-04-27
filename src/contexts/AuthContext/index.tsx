import React, { useMemo, useEffect, useState } from "react";
import { AxiosClient } from "@/middleware";

interface AuthContextValue {
  user: string | null;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
  getUser: () => string;
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: async () => "",
  logout: () => {},
  getUser: () => "",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const apiClient = new AxiosClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
    {
      "Content-Type": "application/json",
    }
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, []);

  const login = async (username: string, password: string): Promise<string> => {
    try {
      const response = await apiClient.post("/login", {
        email: username,
        password: password,
      });
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", response.data.username);
      setUser(response.data.username);
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user") || "";
      return user;
    } else {
      return user || "";
    }
  };

  const authValue = useMemo(
    () => ({ user, login, logout, getUser }),
    [user, login, logout, getUser]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const { login, logout, user, getUser } = React.useContext(AuthContext);
  return { login, logout, user, getUser };
}
