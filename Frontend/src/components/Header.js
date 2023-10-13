import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorMode,
  Flex,
  Stack,
  Button,
  LinkBox,
  HStack,
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box position={"fixed"} zIndex={200} width={"100%"}
        sx={{
          background:
            "linear-gradient(320deg, rgba(2,0,36,0.6208684157256652) 0%, rgba(45,45,204,0.648879620207458) 45%, rgba(35,100,113,0.6208684157256652) 84%, rgba(76,153,65,0.6404762588629201) 100%)",
        }}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-evenly"}>
          <Box>Ticket Tracker</Box>
          <Flex alignItems={"center"}>
            <HStack
              divider={<StackDivider borderColor="blue.8000" />}
              spacing={4}
              align="stretch"
              height="2em">
              <LinkBox as={RouterLink} to="/">
                🏠 Home
              </LinkBox>
              <LinkBox as={RouterLink} to="/tickets">
                🎫 Tickets
              </LinkBox>
              <LinkBox as={RouterLink} to="/customers">
                🧍🏽 Customers
              </LinkBox>
              <LinkBox as={RouterLink} to="users">
                🧑‍💻 Users
              </LinkBox>
            </HStack>
          </Flex>
          <Stack direction={"row"} spacing={7}>
            <Button size="sm" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Divider borderColor="blue.900" />
    </>
  );
}

export default Header;
