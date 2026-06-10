import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  saveToken,
  removeToken,
} from "../utils/auth";

export const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setUser({ token });
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    saveToken(data.token);

    setUser(data);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}