import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check if token exists on app load, prevents logout on page refresh
  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      const decoded = jwtDecode(access);
      setUser({ 
        id: decoded.user_id,
        email: decoded.email,
        role: decoded.role,
      });
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const response = await api.post("auth/login/", { email, password }); // login request

    const {  access, refresh } = response.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    const decoded = jwtDecode(access); // decode access token to get user info

    setUser({
      id: decoded.user_id,
      email: decoded.email,
      role: decoded.role,
    }); // store user in react state
  };

  // LOGOUT
  const logout = async () => {
    const refresh = localStorage.getItem("refresh");

    try {
        await api.post("auth/logout/", { refresh });
    } catch (err) {
        console.error("Logout failed:", err);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh"); // remove tokens from local storage
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};