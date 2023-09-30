import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { CssVarsProvider, StyledEngineProvider } from "@mui/joy/styles";
import UserPage from "./components/UserPage";
import {createBrowserRouter, json, RouterProvider} from "react-router-dom";
import UserCard from "./components/UserCard";
import ErrorPage from "./ErrorPage.js";
import axios from "axios";
import CustomerPage from "./components/CustomerPage";
import Home from "./components/Home";
import {customerData} from './components/customerdata.js'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview/",
        element: <Home />,
      },
      {
        path: "tickets/",
        element: <ErrorPage />,
      },
      {
        path: "customers/",
        element: <CustomerPage />,
        loader: async({params, request}) =>{
          const customers = customerData;
          return { customers }
        }
      },
      {
        path: "users/",
        element: <UserPage />,
        loader: async ({params, request}) => {
          const users = await axios.get("http://localhost:5001/user/all")
              .then((response) => response.data )
          return { users }
        }
      },
      {
        path: "users/:id",
        element: <UserCard />,
      }
    ],
  },
]);

const app = document.getElementById("app");

const root = createRoot(app);

root.render(
  <StyledEngineProvider injectFirst>

    <RouterProvider
      router={router}
      fallbackElement={<ErrorPage/>}
    ></RouterProvider>
  </StyledEngineProvider>
);
