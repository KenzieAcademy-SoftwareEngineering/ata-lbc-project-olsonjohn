import React from "react";
import { Avatar, Box, Center, chakra, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";


function UserCard(props) {
  const {user} = props
 const {pictures} = props

 const picture = pictures[user.userNumber].picture
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
                to={`${user.userId}`}>
              <Heading
                fontWeight="bold"
                textAlign="center"
                display="block"
                fontSize="2xl"
                color="gray.800"
                _dark={{
                  color: "white",
                }}>
                {user.name}
              </Heading>
              <chakra.span
                fontSize="sm"
                color="gray.700"
                _dark={{
                  color: "gray.200",
                }}>
                {`User Number: ${user.userNumber}`}
              </chakra.span>
            </Box>
          </Center>
        </Box>
    </>
  );
}

export default UserCard;
