import {
  Route,
  Routes as RoutesApp,
} from "react-router-dom";
import { Home } from "../pages/home"
import { Imc } from "../pages/imc";
import { Login } from "../pages/login"
import { RegisterUser } from "../pages/register-user"
import { AuthProvider } from "../Providers/auth";


const Routes = () => {
  return (
    // <AuthProvider>
      <RoutesApp >
        <Route path="/" element={<Login />}/>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="register-user" element={<RegisterUser />} />
        <Route path="calc-imc" element={<Imc />} />
      </RoutesApp>
    // </AuthProvider>
  )
}

export default Routes
