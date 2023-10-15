import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, Box, Center , Flex} from "@chakra-ui/react"
import "./css/style.css"


const App = (props) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  })


  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Center>
        <Flex marginTop={"70px"} direction="column" w="1100px" alignItems={"space-around"}>
        <Outlet />
        </Flex>
        </Center>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
