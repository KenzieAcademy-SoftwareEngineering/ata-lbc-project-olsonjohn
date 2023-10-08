import React from "react";
import {
  Badge,
  Button,
  Heading,
  Stack,
  useColorModeValue,
  Flex,
  Image,
  Center,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useOutletContext, useParams } from "react-router-dom";
import { useGetUser } from "../../hooks";

export function UserInfoCard(props) {
  const { id } = useParams();

  const { data, status: userStatus } = useGetUser(id);

  const { pictures } = useOutletContext();
  if (userStatus === "loading") {
    return (
      <>
        <Spinner></Spinner>
      </>
    );
  }

  if (userStatus !== "loading" || userStatus !== "error") {
    console.log(`UserData:${{data}}`);
    return (
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}>
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={pictures[data.userNumber].picture.large}
              alt="#"
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {data.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              User Number: {data.userNumber}
            </Text>
            <Text
              textAlign={"center"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}>
              Bio Information
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                fontWeight={"400"}>
                Admin
              </Badge>
            </Stack>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Button
                size="sm"
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"orange.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "orange.500",
                }}>
                Edit
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    );
  }
}

export default UserInfoCard;
