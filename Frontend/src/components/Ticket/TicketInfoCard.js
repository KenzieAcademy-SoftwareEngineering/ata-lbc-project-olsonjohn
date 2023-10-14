import React, {useMemo, useState}from 'react';
import {NavLink, useParams, useLocation} from 'react-router-dom';
import {useGetCustomer, useGetTicket} from "../../hooks";
import {
  Skeleton,
  Card,
  Heading,
  Text,
  Flex,
  Button,
  CardHeader,
  Center,
  Icon,
  Divider,
  CardBody,
  CardFooter,
  Spacer,
  IconButton,
  ButtonGroup,
  InputGroup,
  InputLeftAddon,
  Input,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  StepNumber,
  useSteps,
  Box,
  StepTitle,
  StepDescription,
  StepSeparator,
} from "@chakra-ui/react";
import {AiFillFileText} from "react-icons/ai";
import {LuFileQuestion} from "react-icons/lu";
import {IoArrowBackOutline} from "react-icons/io5";
import dayjs from "dayjs";
import TicketInfoDivCard from "./TicketInfoDivCard";



const TicketInfoCard = () => {
  const {id} = useParams()
  const {data: ticket, status} = useGetTicket(id);


  function getSearchParams() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const searchParams = getSearchParams();
  const customerId = Object.entries(searchParams.getAll('customerId'))[0][1]

  const {data: customer, status: customerStatus} = useGetCustomer(customerId);



  const steps = [
    { title: 'New Ticket', description: '' },
    { title: 'In Progress', description: '' },
    { title: 'Completed', description: '' },
  ]

  const { activeStep } = useSteps({ index: 1,  count: steps.length })
 const ticketStatusList = ["NEW", "In Progress", "Completed"]


  if (status === "error") {
    return <p>Error</p>
  }

  if (status !== "loading"|| customerStatus !== "loading") {
  console.log(customer)

    const info = {
      "Ticket ID: ": ticket.ticketId,
      "Subject: ": ticket.subject,
      "Created At: ": dayjs(ticket.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      "Finished At: ": dayjs(ticket.finishedAt).format("DD/MM/YYYY HH:mm:ss"),
      "Description: ": ticket.description,
    }


    return (
      <Skeleton isLoaded={status !== "loading"|| customerStatus !== "loading"}>

        <Flex direction={"column"}>
          <Flex minwidth='max-content' p={15} m={15} alignItems='center' gap='2'>
            <IconButton size="lg" as={NavLink} to={"/tickets"} variant={"outline"} colorScheme={"teal"} size={"sm"}
                        aria-label={"Back"} icon={<IoArrowBackOutline/>}/>
            <Spacer/>
            <ButtonGroup>
              <Button variant={"outline"} colorScheme={"teal"} size={"sm"}>
                Edit
              </Button>
              <Button variant={"outline"} colorScheme={"teal"} size={"sm"}>
                Delete
              </Button>

            </ButtonGroup>
          </Flex>



          <Flex>

            <Card
              variant="elevated"
              boxShadow={"dark-lg"}
              borderRadius={20}
              p={1.5}
              w={'max-content'}
              flexGrow={1}
              backgroundColor={"rgba(111,200,202,0.5)"}
              _dark={{textColor: "teal.200", backgroundColor: "rgba(125,200,200,0.15)", boxShadow: "dark-lg "}}
              _light={{textColor: "teal.300", backgroundColor: "rgba(125,200,200,0.15)"}}
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
              <CardBody  display={'flex'} flexDirection={'column'} h={"max-content"}>
            <Stepper  index={ticketStatusList.indexOf(ticket.status) + 1 } m={5}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink='0'>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
                <Flex justifyContent={'space-evenly'} gap={2}>

                  <Center justifyContent={'flex-start'} flexDirection={'column'} gap={3}>
                    <Card variant={'outline'} borderRadius={15}>
                      <CardHeader bgColor={'background: rgba(0, 0, 0, 0.4)'} gap={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Icon as={AiFillFileText} boxSize={35}/>
                        <Heading textDecoration="underline" fontSize='md' fontWeight='bold'>Customer Info</Heading>
                      </CardHeader>
                      <Divider/>
                      <CardBody>
                        <form
                          id="customer-add-form"
                          onSubmit={() => {
                            console.log("submitted")
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                          }}>
                          <InputGroup>
                            <InputLeftAddon w={'40%'} children="First Name"/>
                            <Input
                              name="firstName"
                              type="text"
                              readOnly={true}
                              value={customer.firstName}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftAddon w={'40%'} children="Last Name"/>
                            <Input
                              name="lastName"
                              type="text"
                              readOnly={true}
                              value={customer.lastName}
                            />
                          </InputGroup>

                          <InputGroup>
                            <InputLeftAddon w={'40%'} children="Email"/>
                            <Input
                              name="emailAddress"
                              type="text"
                              readOnly={true}
                              value={customer.emailAddress}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftAddon w={'40%'} children="Address"/>
                            <Input
                              name="address"
                              type="text"
                              readOnly={true}
                              value={customer.address}
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputLeftAddon w={'40%'} children="Phone Number"/>
                            <Input
                              variant={'disabled'}
                              name="phoneNumber"
                              type="tel"
                              readOnly={true}
                              value={customer.phoneNumber}
                            />
                          </InputGroup>
                          {/*<ButtonGroup>*/}

                          {/*  <Spacer />*/}
                          {/*  <Button*/}
                          {/*    size="sm"*/}
                          {/*    flex={1}*/}
                          {/*    fontSize={"sm"}*/}
                          {/*    rounded={"full"}*/}
                          {/*    bg={"green.400"}*/}
                          {/*    color={"white"}*/}
                          {/*    boxShadow={*/}
                          {/*      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"*/}
                          {/*    }*/}
                          {/*    _hover={{*/}
                          {/*      bg: "green.500",*/}
                          {/*    }}*/}
                          {/*    _focus={{*/}
                          {/*      bg: "green.500",*/}
                          {/*    }}*/}
                          {/*    colorScheme="green"*/}

                          {/*    variant="solid"*/}
                          {/*    type="submit"*/}
                          {/*    form="customer-add-form">*/}
                          {/*    Save*/}
                          {/*  </Button>*/}
                          {/*</ButtonGroup>*/}
                        </form>
                      </CardBody>
                    </Card>
                    <Divider orientation={'horizontal'} />
                    <Card variant={'outline'} borderRadius={15}>
                      <CardHeader gap={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Icon as={AiFillFileText} boxSize={35}/>
                        <Heading textDecoration="underline" fontSize='md' fontWeight='bold'>User Info</Heading>
                      </CardHeader>
                      <Divider/>
                      <CardBody>
                        <Flex direction={'column'}>
                          <Text>User Name: BatMan </Text>
                          <Text>User Number: 1000 </Text>
                        </Flex>
                      </CardBody>
                    </Card>

                  </Center>
                  <Divider orientation={"vertical"}/>

                  <Card variant={'outline'} borderRadius={15}>
                    <CardHeader gap={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                      <Icon as={AiFillFileText} boxSize={35}/>
                      <Heading textDecoration="underline" fontSize='md' fontWeight='bold'>Ticket Info</Heading>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                      <Flex direction={'column'}>


                        {Object.entries(info)
                          .map(([item, value]) => <TicketInfoDivCard key={item} item={item} value={value} />)}

                          </Flex>
                          </CardBody>
                          </Card>
                          </Flex>

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
                    </CardBody>
                  </Card>
                </Flex>
          </Flex>
      </Skeleton>
  )
  }
  }

  export default TicketInfoCard;
