import React from "react";
import {Box, CardHeader, Container, Center, Text, Card, Flex, CardBody, Divider} from "@chakra-ui/react";
import {useGetCustomers, useGetTickets, useGetUser, useGetUsers} from "../hooks";
import * as PropTypes from "prop-types";


function Home() {

  const {data: ticketData, status: ticketStatus} = useGetTickets()
  // const {data: newTicketData, status: newTicketStatus} = useGetTickets(["NEW"])
const {data: customerData, status: customerStatus } = useGetCustomers()
const {data: userData, status: userStatus } = useGetUsers()


  if (ticketStatus === "loading") return <h1>Loading...</h1>
  if (ticketStatus === "error") return <h1>Error</h1>

  const body = document.querySelector("body")
  body.style.backgroundColor = "rgba(151,181,171,.15)"

  return (
    <>
      <Container p={4} size={'lg'} rounded={'20px'}>
        <Card p={2}>
          <Center flexDirection={'column'}>
            <CardHeader p={2}>
              <Text>Welcome to Ticketing System</Text>
            </CardHeader>
          </Center>
        </Card>
      </Container>

      <Flex direction={'column'} gap={4}>
        <Container boxShadow="dark-lg" p='4' w="max-content" size={'sm'} rounded={'20px'}>
          <Card p={2}>
            <Center flexDirection={'column'}>
              <CardHeader p={2}>
                <Text>Total Tickets</Text>
              </CardHeader>
              <Divider/>
              <CardBody p={.5}>
                <Text>  {ticketData.length}</Text>
              </CardBody>
            </Center>
          </Card>
        </Container>
        <Container boxShadow="dark-lg" p='4' w={'max-content'} size={'sm'} rounded={'20px'}>
          <Card p={2}>
            <Center flexDirection={'column'}>
              <CardHeader p={2}>
                <Text>New Tickets</Text>
              </CardHeader>
              <Divider/>
              <CardBody p={.5}>
                <Text>{ticketData.filter((ticket) => ticket.ticketStatus === "NEW").length}</Text>
              </CardBody>
            </Center>
          </Card>
        </Container>
        <Container boxShadow="dark-lg" p='4' w={'max-content'} size={'sm'} rounded={'20px'}>
          <Card p={2}>
            <Center flexDirection={'column'}>
              <CardHeader p={2}>
                <Text>In Progress</Text>
              </CardHeader>
              <Divider/>
              <CardBody p={.5}>
                <Text>{ticketData.filter((ticket) => ticket.ticketStatus === "IN_PROGRESS").length}</Text>
              </CardBody>
            </Center>
          </Card>
        </Container>
        <Container boxShadow="dark-lg" p='4' w={'max-content'} size={'sm'} rounded={'20px'}>
          <Card p={2}>
            <Center flexDirection={'column'}>
              <CardHeader p={2}>
                <Text >Completed</Text>
              </CardHeader>
              <Divider/>
              <CardBody p={.5}>
                <Text>{ticketData.filter((ticket) => ticket.ticketStatus === "COMPLETED").length}</Text>
              </CardBody>
            </Center>
          </Card>
        </Container>
      </Flex>

    </>
  );
}

export default Home;
