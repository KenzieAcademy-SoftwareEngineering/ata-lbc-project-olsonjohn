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
import CustomerCard from "./CustomerCard";
import { useGetCustomers, usePictures } from "../../hooks";

export function CustomerPage() {
  const { data: customers, status } = useGetCustomers();
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
    
    if (pictureStatus === "error" || status === "error") {
      return (
        <>
        <Heading> Error. </Heading>
        </>
      )
    }

    
    
  return (
    <>
      <Box>
        <Container size="lg" outline={true}>
          <Center>
            <Heading marginTop="85px" position={"fixed"}>Customer List</Heading>
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
                <Flex marginLeft={"6rem"} minWidth="max-content" direction="column" gap="1.5em" >
                  {customers &&
                    pictureURLList &&
                    customers.map((customer) => (
                      <CustomerCard
                        key={customer.id}
                        customer={customer}
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

