import { useContext, createContext, useState } from "react";
import { useLocalStorage } from 'usehooks-ts'

type AuthProviderType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext({} as AuthProviderType);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  // const [user, setUser] = useState(null);
  // TODO: when renders for the first time fetches the api to check if it is authenticated (?)
  // or use localstorage to remember if the user is authenticated
  const isAuthenticated = user !== null;

  const login = () => {
    setUser({ id: 1, username: "afonsocrg" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
