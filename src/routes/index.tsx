import {
  Route,
  Routes as RoutesApp,
} from "react-router-dom";
import FollowUp from "../pages/follow-up";
import Home from "../pages/home";
import Imc from "../pages/imc";
import RegisterUser from "../pages/register-user"
import ReportUser from "../pages/report";
import { Login } from "../pages/login"

const Routes = () => {
  return (
    <RoutesApp >
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="calc-imc" element={<Imc />} />
      <Route path="register/:type" element={<RegisterUser />} />
      <Route path="reports/:type" element={<ReportUser />} />
      <Route path="follow-up/:iduser" element={<FollowUp />} />
    </RoutesApp>
  )
}

export default Routes
