import React from "react";
import { Avatar, Box, Center, chakra, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";


function randomNumber() {
    return Math.floor(Math.random() * 900) + 100;
}

export function CustomerCard(props) {
  const {customer} = props
 const {pictures} = props

 const pictureNumber = randomNumber()
 const picture = pictures[pictureNumber].picture

  return (
    <>
        <Box
          w="xs"
          bg="white"
          _dark={{
            bg: "gray.900",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          justifyContent="center"
          mx="auto">
          <Center gap="2em">
            <Avatar
            size="lg"
            name="John Doe"
            src={picture.thumbnail}
            />
            <Box py={5} textAlign="center" as={RouterLink}
                to={`${customer.id}`}>
              <Heading
                fontWeight="bold"
                textAlign="center"
                display="block"
                fontSize="2xl"
                color="gray.800"
                _dark={{
                  color: "white",
                }}>
                {`${customer.firstName} ${customer.lastName}`}
              </Heading>
            </Box>
          </Center>
        </Box>
    </>
  );
}

export default CustomerCard;