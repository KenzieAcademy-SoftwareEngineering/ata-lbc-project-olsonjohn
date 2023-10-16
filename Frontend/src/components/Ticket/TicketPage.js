import {
  Center,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  HStack,
  Button,
  Box,
  Heading,
  TabPanels,
  Skeleton,
  Stack, 
  StackDivider, 
  Spacer
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useGetTickets} from "../../hooks";
import TicketCard from "./TicketCard";
import {NavLink} from "react-router-dom";

function TicketPage() {

  const {data: tickets, status, setStatusFilter} = useGetTickets();

  const ticketStatusValues = ["new", "in progress", "completed"];

  const [tabIndex, setTabIndex] = React.useState(0)

  //setStatusFilter(ticketStatusValues[tabIndex]);


  const [newTicket, setNewTickets] = useState([]);




  return (
    <>
      <Box>
        <Center>
          <HStack>
          <Heading>Tickets</Heading>
          <Spacer />
            <Button size='lg' as={NavLink} to="/tickets/add"> Add Ticket </Button>
          </HStack>
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
              <Skeleton isLoaded={status !== "loading" ? true : false}>
                <Stack divider={<StackDivider borderColor='gray.50'/>}>
                  {tickets ? tickets.filter((ticket) => ticket.ticketStatus === "NEW").map((ticket) => <TicketCard  key={ticket.ticketId} ticket={ticket}/>) : null}
                </Stack>
              </Skeleton>
            </TabPanel>
            <TabPanel>
              <Skeleton isLoaded={status !== "loading" ? true : false}>
              <Stack divider={<StackDivider borderColor='gray.50'/>}>
                {tickets ? tickets.filter((ticket) => ticket.ticketStatus === "IN_PROGRESS").map((ticket) => <TicketCard  key={ticket.ticketId} ticket={ticket}/>) : null}
              </Stack>
            </Skeleton>
            </TabPanel>
            <TabPanel>
              <Skeleton isLoaded={status !== "loading" ? true : false}>
                <Stack divider={<StackDivider borderColor='gray.50'/>}>
                  {tickets ? tickets.filter((ticket) => ticket.ticketStatus === "COMPLETED").map((ticket) => <TicketCard key={ticket.ticketId} ticket={ticket}/>) : null}
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
