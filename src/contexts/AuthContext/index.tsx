import React, { useMemo, useEffect, useState } from "react";
import { AxiosClient } from "@/middleware/api";

interface AuthContextValue {
  user: string | null;
  login: (username: string, password: string) => Promise<string>;
  register: (
    email: string,
    password: string,
    username: string,
    role: string
  ) => Promise<string>;
  logout: () => void;
  getUser: () => string;
  getToken: () => string;
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: async () => "",
  register: async () => "",
  logout: () => {},
  getUser: () => "",
  getToken: () => "",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const apiClient = new AxiosClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`,
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
      setToken(response.data.accessToken);
      return response.data.username;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const register = async (
    username: string,
    password: string,
    email: string,
    role: string
  ): Promise<string> => {
    try {
      const response = await apiClient.post("/register", {
        email: email,
        password: password,
        username: username,
        role: role,
      });
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", response.data.username);
      setUser(response.data.username);
      setToken(response.data.accessToken);
      return response.data.username;
    } catch (error) {
      console.log(error);
      return "";
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

  const getToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token") || "";
      return token;
    } else {
      return token || "";
    }
  };

  const authValue = useMemo(
    () => ({ user, login, logout, getUser, register, getToken }),
    [user, login, logout, getUser, register, getToken]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const { login, logout, user, getUser, register, getToken } =
    React.useContext(AuthContext);
  return { login, logout, user, getUser, register, getToken };
}
