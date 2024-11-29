import React, { createContext, useContext, useState, useEffect } from "react";

import { fetchAuthToken } from "../auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const fetchedToken = await fetchAuthToken();
      setToken(fetchedToken);
    };

    if (!token) {
      getToken();
    }
  }, [token]);

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export const useAuthToken = () => {
  const token = useContext(AuthContext);
  if (!token) {
    throw new Error("El token no está disponible.");
  }
  return token;
};
