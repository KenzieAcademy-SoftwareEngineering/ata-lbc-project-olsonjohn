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
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  ButtonGroup,
} from "@chakra-ui/react";
import { useOutletContext, useParams } from "react-router-dom";
import { useGetCustomer } from "../../hooks";

function randomNumber() {
  return Math.floor(Math.random() * 900) + 100;
}

export function CustomerInfoCard(props) {
  const { id } = useParams();

  const { data, status: customerStatus } = useGetCustomer(id);

  const { pictures } = useOutletContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (customerStatus === "loading") {
    return (
      <>
        <Spinner></Spinner>
      </>
    );
  }

  if (customerStatus !== "loading" || customerStatus !== "error") {
    console.log(`UserData:${{ data }}`);
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
              src={pictures[randomNumber()].picture.large}
              alt="#"
            />
          </Flex>
          <Center>
            <Stack
              flex={1}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={1}
              pt={2}>
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {`${data.firstName} ${data.lastName}`}
              </Heading>
              <Text
                textAlign={"center"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue("gray.700", "gray.400")}
                px={3}>
                <Badge>Email</Badge>
                <Text>{data.emailAddress}</Text>
                <Badge>Address</Badge> <Text>{data.address}</Text>
                <Badge>Phone Number</Badge>
                <Text>{data.phoneNumber}</Text>
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
                  }}
                  onClick={onOpen}>
                  Edit
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader Center>Edit Customer Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {console.log(data)}
                      <form
                        id="customer-edit-form"
                        onSubmit={handleSubmit}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}>
                            <InputGroup>
                        <InputLeftAddon children="First Name" />
                        <Input
                          value={`${data.firstName}`}
                          type="text"
                          placeholder="First Name"
                          />
                          </InputGroup>
                        <InputGroup>
                        <InputLeftAddon children="Last Name" />
                        <Input
                          value={`${data.lastName}`}
                          type="text"
                          placeholder="Last Name"
                        />
                        </InputGroup>
                        
                        <InputGroup>
                        <InputLeftAddon children="Email" />
                        <Input
                          value={`${data.emailAddress}`}
                          type="text"
                          placeholder="Email"
                        />
                        </InputGroup>
                        <InputGroup>
                        <InputLeftAddon children="Address" />
                        <Input
                          value={`${data.address}`}
                          type="text"
                          placeholder="Address"
                        />
                        </InputGroup>
                        <InputGroup>
                        <InputLeftAddon children="Phone Number" />
                        <Input
                          value={`${data.phoneNumber}`}
                          type="text"
                          placeholder="Phone Number"
                        />
                        </InputGroup>
                        <ButtonGroup>
                        <Button type="submit" form="customer-edit-form">
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose}>Delete</Button>

                        </ButtonGroup>
                      </form>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Text>
            </Stack>
          </Center>
        </Stack>
      </Center>
    );
  }
}

export default CustomerInfoCard;
