import { useEffect, useState } from "react";

export default function useAuth() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (token && storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    } else {

      setUser(null);
    }

    setLoading(false);

  }, []);

  const login = (data) => {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.name,
        email: data.email,
      })
    );

    setUser({
      name: data.name,
      email: data.email,
    });
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
}