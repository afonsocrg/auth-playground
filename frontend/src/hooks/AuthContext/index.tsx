import { useContext, createContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { User } from "@services/api";

type AuthProviderType = {
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};
const AuthContext = createContext({} as AuthProviderType);

export default function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage<User>("user", null);
  const isAuthenticated = user !== null;

  const login = (user: User) => {
    if (user !== null && user !== undefined) setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
  throw new Error(
    "AuthContext was used outside the AuthProvider"
  );
  return context
};
