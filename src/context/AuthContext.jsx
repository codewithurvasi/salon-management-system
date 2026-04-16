import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setUser({ token, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password, type) => {
    try {
      const response = await axios.post("/auth/admin/login", {
        email,
        password,
      });

      console.log("Backend login response:", response.data);

      const { token, role, ...userData } = response.data;
      const finalRole = role || type || userData?.role || "";

      localStorage.setItem("token", token);
      localStorage.setItem("role", finalRole);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          token,
          role: finalRole,
        }),
      );

      setUser({
        ...userData,
        token,
        role: finalRole,
      });

      return {
        success: true,
        token,
        role: finalRole,
        user: {
          ...userData,
          token,
          role: finalRole,
        },
        message: "Login successful",
      };
    } catch (error) {
      console.error("Login API error:", error?.response?.data || error.message);

      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (data, type) => {
    try {
      const response = await axios.post(`/auth/${type}/register`, data);
      const { token, role, ...userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role || type);
      setUser({ ...userData, token, role: role || type });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
