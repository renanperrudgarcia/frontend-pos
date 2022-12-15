import * as React from "react"
import {
  ChakraProvider
} from "@chakra-ui/react"
import Routes from "./routes"
import { ToastContainer } from "react-toastify"
import { BrowserRouter } from "react-router-dom";

export const App = () => (
  <ChakraProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </ChakraProvider>
)
