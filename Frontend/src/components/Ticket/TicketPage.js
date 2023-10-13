import { Center, Divider,Tabs, TabList, TabPanel, Tab, Box, Heading, TabPanels } from "@chakra-ui/react";
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
          <TabList color="black"size="lg">
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
              _selected={{ color: "black", bg: "brown" }}
              _focus={{ boxShadow: "lg" }}>
              Completed Tickets{" "}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                New
            </TabPanel>
            <TabPanel>
                In Progress
            </TabPanel>
            <TabPanel>
                Completed
            </TabPanel>
          
          
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default TicketPage;
