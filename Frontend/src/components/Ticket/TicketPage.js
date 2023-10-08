import { Center, Divider,Tabs, TabList, Tab, Box, Heading } from "@chakra-ui/react";
import React from "react";

function TicketPage() {
  return (
    <>
      <Box>
        <Center>

        <Heading>Tickets</Heading>
        </Center>
        <Divider />
        <Tabs size="lg" m="2" variant="enclosed" isFitted>
          <TabList size="lg">
            <Tab
              bgColor={"#e5e5e5"}
              _selected={{ color: "black", bg: "green" }}
              _focus={{ boxShadow: "lg" }}>
              New Ticket
            </Tab>
            <Tab
              bgColor={"#e5e5e5"}
              _selected={{ color: "black", bg: "yellow" }}
              _focus={{ boxShadow: "lg" }}>
              In Progress Tickets
            </Tab>{" "}
            <Tab
              bgColor={"#e5e5e5"}
              _selected={{ color: "black", bg: "red" }}
              _focus={{ boxShadow: "lg" }}>
              Overdue Tickets{" "}
            </Tab>
          </TabList>
        </Tabs>
      </Box>
    </>
  );
}

export default TicketPage;
