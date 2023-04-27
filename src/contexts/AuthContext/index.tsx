import React, { useMemo, useEffect, useState } from "react";
import { AxiosClient } from "@/middleware";

interface AuthContextValue {
  user: string | null;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: async () => "",
  logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const apiClient = new AxiosClient(`${process.env.API_BASE_URL}/auth`, {
    "Content-Type": "application/json",
  });

  useEffect(() => {
    console.log("useEffect");
    if(typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if(user) {
        setUser(user);
      }
    }

  }, []);

  const login = async (username: string, password: string): Promise<string> => {
    console.log("login");
    try {
      const response = await apiClient.get("/login");
      console.log(JSON.stringify(response));
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", response.data.username);
      setUser(response.data.username);
      return response.data.accessToken;
    } catch(error) {
      console.log(error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const authValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const { login, logout, user } = React.useContext(AuthContext);
  return { login, logout, user };
}
