import * as React from "react"
import {
  ChakraProvider
} from "@chakra-ui/react"
import Routes from "./routes"
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Providers/auth";

export const App = () => (
  <ChakraProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
)
