import { useContext } from "react";
import { createContext, useState } from "react";
import { User } from "../services/users";

interface AuthContextType {
  user?: User;
  signin?: (user: User, callback: VoidFunction) => void;
  signout?: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);

  const signin = (newUser: User, callback: VoidFunction) => {
      setUser(newUser);
      callback();
  };

  const signout = (callback: VoidFunction) => {
      setUser(null);
      callback();
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}
