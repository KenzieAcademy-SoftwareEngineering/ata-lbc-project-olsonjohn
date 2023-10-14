import {
  Center,
  Divider,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  Box,
  Heading,
  TabPanels,
  Skeleton,
  Stack, StackDivider, background
} from "@chakra-ui/react";
import React from "react";
import {useGetTickets} from "../../hooks";
import TicketCard from "./TicketCard";

function TicketPage() {

  const {data: tickets, status, setStatusFilter} = useGetTickets();

  const ticketStatusValues = ["new", "in progress", "completed"];

  const [tabIndex, setTabIndex] = React.useState(0)

  //setStatusFilter(ticketStatusValues[tabIndex]);


  return (
    <>
      <Box>
        <Center>
          <Heading>Tickets</Heading>
        </Center>
        <Tabs size="md" isFitted align="center" m={5}  defaultIndex={0}
              onChange={(index) => setTabIndex(index)}>
          <TabList color="blackAlpha.300" gap={35}  size="md" _dark={{textColor: "whiteAlpha.300"}}>
            <Tab
              _selected={{color: "black", bg: "green.500"}}
              _focus={{boxShadow: "dark-lg"}}
              borderRadius="15px">
              New Ticket
            </Tab>
            <Tab
              _selected={{color: "black", bg: "yellow.200"}}
              _focus={{boxShadow: "dark-lg"}}
              borderRadius="15px">
              In Progress Tickets
            </Tab>
            <Tab
              _selected={{color: "black", bg: "teal.200"}}
              _focus={{boxShadow: "dark-lg"}}
              borderRadius="15px">
              Completed Tickets
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Skeleton isLoaded={status != "loading" ? true : false}>
                <Stack divider={<StackDivider borderColor='gray.50'/>}>
                  {tickets ? tickets.map((ticket) => <TicketCard  key={ticket.ticketId} ticket={ticket}/>) : null}
                </Stack>
              </Skeleton>
            </TabPanel>
            <TabPanel>
              <Skeleton isLoaded={status != "loading" ? true : false}>
              <Stack divider={<StackDivider borderColor='gray.50'/>}>
                {tickets ? tickets.map((ticket) => <TicketCard  key={ticket.ticketId} ticket={ticket}/>) : null}
              </Stack>
            </Skeleton>
            </TabPanel>
            <TabPanel>
              <Skeleton isLoaded={status != "loading" ? true : false}>
                <Stack divider={<StackDivider borderColor='gray.50'/>}>
                  {tickets ? tickets.map((ticket) => <TicketCard key={ticket.ticketId} ticket={ticket}/>) : null}
                </Stack>
              </Skeleton>
            </TabPanel>


          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default TicketPage;
