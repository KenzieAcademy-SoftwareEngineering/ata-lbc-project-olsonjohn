import React from "react";
import App from "./App";
import {StyledEngineProvider} from "@mui/joy/styles";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./ErrorPage.js";
import CustomerPage, {customersLoader} from "./components/CustomerPage";
import Home from "./components/Home";
import {UserPage, usersLoader} from "./components/UserPage";
import {createRoot} from "react-dom/client";
import {UserDetail} from "./components/UserDetail";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App/>}>
        <Route index element={<Home/>}/>
        <Route id="users" path="/users" element={<UserPage/>} loader={usersLoader}>
          <Route path="/users/:id" element={<UserDetail/>}/>
        </Route>
        <Route path="/customers" element={<CustomerPage/>} loader={customersLoader}/>
        <Route path="/tickets" element={<ErrorPage/>}/>
      </Route>
    </>
  )
)

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
