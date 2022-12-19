import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { User } from "../services/users";

interface AuthContextType {
  user?: User;
  signin?: (user: User, callback: VoidFunction) => void;
  signout?: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({} as User);
    const  navigate  = useNavigate()

  const signin = (newUser: User, callback: VoidFunction) => {
      setUser(newUser);
      localStorage.setItem('user',JSON.stringify(newUser))
    callback();
  };

  const signout = () => {
      setUser(null);
      localStorage.removeItem('user')
      window.location.replace('/')
  };



  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}
