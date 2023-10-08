import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Center,
  Container,
  Heading,
  Skeleton,
  SimpleGrid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import UserCard from "./UserCard";
import { usePictures } from "../../hooks";
import { useGetUsers } from "../../hooks";

export function UserPage() {
  const { data, status } = useGetUsers();
  const { data: pictures, status: pictureStatus } = usePictures();
  let pictureURLList = [];
  
  if (pictureStatus === "success") {
    pictureURLList = pictures.results;
  }

  if (pictureStatus === "loading" || status === "loading")
    return (
      <>
        <Heading>Loading...</Heading>
      </>
    );
  return (
    <>
      <Box>
        <Container size="lg" outline={true}>
          <Center>
            <Heading>User List</Heading>
          </Center>
        </Container>
        <Flex marginBlock={20}>
          <SimpleGrid
            minChildWidth="540px"
            gridTemplateColumns="repeat(2, 1fr)"
            spacing={4}>
            <GridItem colStart={3}>
              <Spacer />
              <Skeleton isLoaded={pictureStatus !== "loading" || "error"}>
                <Flex minWidth="max-content" direction="column" gap="1.5em">
                  {data &&
                    pictureURLList &&
                    data.map((user) => (
                      <UserCard
                        key={user.userId}
                        user={user}
                        pictures={pictureURLList}
                      />
                    ))}
                </Flex>
              </Skeleton>
            </GridItem>
            <GridItem colStart={5}>
              <Center>
                <Outlet context={{ pictures: pictureURLList }} />
              </Center>
            </GridItem>
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
}

export default UserPage;
