import React from "react";
import { Outlet } from "react-router-dom";
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
  Box,
  Spinner,
  Modal,
  ModalBody,
  Container,
  Spacer,
  SimpleGrid,
  GridItem,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Skeleton
} from "@chakra-ui/react";
import CustomerCard from "./CustomerCard";
import { useGetCustomers, usePictures } from "../../hooks";
import AddCustomerForm from "./AddCustomerForm";


export function CustomerPage() {
  const { data: customers, status } = useGetCustomers();
  const { data: pictures, status: pictureStatus } = usePictures();
  const { isOpen, onClose, onOpen } = useDisclosure();
  
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
          <Container size="lg" variant="outline" display={"flex"} outline={true} marginTop={"60px"} solid>
            <Heading variant={'outline'}>Customer List</Heading> 
            <Spacer />
            <Button
                  size="sm"
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"purple.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "purple.500",
                  }}
                  _focus={{
                    bg: "purple.500",
                  }}
                  onClick={onOpen}>
                  Add Customer
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} p={6}>
                  <ModalOverlay opacity="0.9" filter={`blur("20px")`} />
                  <ModalContent>
                    <ModalHeader Center>Add New Customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <AddCustomerForm
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
          </Container>
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

