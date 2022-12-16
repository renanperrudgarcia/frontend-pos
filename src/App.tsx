import * as React from "react"
import {
  ChakraProvider
} from "@chakra-ui/react"
import Routes from "./routes"
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./Providers/auth";

export const App = () => (
  <ChakraProvider>
    <HashRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </HashRouter>
  </ChakraProvider>
)
