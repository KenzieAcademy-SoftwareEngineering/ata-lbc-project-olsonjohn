import React from "react";
import {
  Card,
  Box,
  CardFooter,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Heading,
  Icon,
  Spacer,
  Divider,
  Center,
  Highlight,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import {BsFillClipboardFill} from 'react-icons/bs';
import {AiFillFileText} from 'react-icons/ai'
import {LuFileQuestion} from 'react-icons/lu'
import dayjs from 'dayjs'
import {NavLink} from "react-router-dom";
import { usePrefetchCustomer,getTicket, getCustomer } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";

const TicketCard = (props) => {

  const {ticket} = props;
  const queryClient = useQueryClient();
  return (<Card
      as={NavLink}
      to={`/tickets/${ticket.ticketId}?customerId=${ticket.customerId}&userId=${ticket.users[0]}&ticketStatus=${ticket.ticketStatus}`}
      key={ticket.ticketId}
      variant="elevated"
      boxShadow={"dark-lg"}
      borderRadius={20}
      p={1.5}
      _dark={{textColor: "teal.200", backgroundColor: "cyan.800", boxShadow: "dark-lg "}}
      _light={{textColor: "teal.300", backgroundColor: "cyan.50"}}
      onMouseEnter={async () => {
        await queryClient.prefetchQuery({ queryKey: ["customers", ticket.customerId], queryFn: () => getCustomer(ticket.customerId) })
        await queryClient.prefetchQuery({ queryKey: ["ticket", ticket.ticketId], queryFn: () => getTicket(ticket.ticketId) })
      }}
    >
      <CardHeader p={.5}>
        <Flex gap={3} justifyContent="space-between" alignItems="center" p={1}>
          <Center gap={3}>
            <Icon as={AiFillFileText} boxSize={35} color="cyan.400"/>
            <Heading textDecoration="underline" fontSize='xl' fontWeight='bold'
                     color="teal.400">{ticket.subject}</Heading>
          </Center>
          <Text fontSize='sm' color="blue.200">{ticket.ticketId}</Text>

        </Flex>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Flex gap={1} alignItems="center" direction={"column"}>
          <Text fontSize='lg'>{ticket.description}</Text>
        </Flex>
      </CardBody>
      <Divider/>
      <CardFooter p={1}>
        <Flex flexGrow={1} gap={1} p={.25} alignItems="center" justifyContent="space-between">
          <Center>
            <Icon as={LuFileQuestion} color="cyan.400" boxSize={25}/>
            <Text fontSize='md' color="cyan.400"> {ticket.status}</Text>
          </Center>
          <Spacer/>
          <Text fontSize='sm' color="blue.400"> {dayjs(ticket.createdAt).toString()}</Text>
        </Flex>
      </CardFooter>
    </Card>
  )
}


export default TicketCard;