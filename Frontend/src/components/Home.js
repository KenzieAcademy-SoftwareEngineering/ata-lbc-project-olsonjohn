import React from "react";
import {Box, Container, Center, Text } from "@chakra-ui/react";


function Home() {
  return (
    <>
    <Box>

      <h1>Home</h1>
    
      <Container boxShadow="dark-lg" p='4' size={'lg'} rounded={'20px'}>
        <Center>
          <Text>Hello World</Text>
        </Center>
      </Container>
    </Box>
    </>
  );
}
export default Home;
