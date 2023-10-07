import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, Box, Center , Flex} from "@chakra-ui/react"
import "./css/style.css"


const App = (props) => {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Flex direction="column" w="1100px" alignItems={"space-around"}>

        <Header />
        <Outlet />
        </Flex>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
