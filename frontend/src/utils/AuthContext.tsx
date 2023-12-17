import React, { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string, admin: boolean) => void;
  signOut: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const bootstrapAsync = () => {
      const token = localStorage.getItem("accessToken");
      const isAdmin = localStorage.getItem("isAdmin");

      setIsLoading(false);
      setUserToken(token);
      setIsAdmin(!!isAdmin);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    isLoading,
    userToken,
    isAdmin,
    signIn: async (token: string, admin: boolean) => {
      localStorage.setItem("accessToken", token);
      setUserToken(token);
      if (admin) {
        admin && localStorage.setItem("isAdmin", "true");
        console.log(admin, "add");
        setIsAdmin(true);
      }
    },
    signOut: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAdmin");
      setUserToken(null);
    },
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
