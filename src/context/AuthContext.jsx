import { createContext, useContext, useState } from "react";
import api from "../api/axios";
const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const register = async (data) => {
    const res = await api.post("/api/auth/register", data);
    setUser(res.data);
  };
  const login = async (data) => {
    const res = await api.post("/api/auth/login", data);
    setUser(res.data);
  };
  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
  };
  return (
    <AuthCtx.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}