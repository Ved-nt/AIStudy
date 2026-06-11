import { useEffect, useState } from "react";

import { authAPI }
from "../services/api";

export default function useAuth() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const data =
          await authAPI.me();

        setUser(data);

      } catch {

        setUser(null);

      } finally {

        setLoading(false);
      }
    };

    checkAuth();

  }, []);

  const logout = async () => {

    try {

      await authAPI.logout();

    } finally {

      setUser(null);

      localStorage.removeItem(
        "user"
      );
    }
  };

  return {
    user,
    loading,
    logout,
  };
}