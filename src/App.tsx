import * as React from "react"
import {
  ChakraProvider
} from "@chakra-ui/react"
import Routes from "./routes"
import { BrowserRouter } from "react-router-dom";

export const App = () => (
  <ChakraProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  </ChakraProvider>
)
