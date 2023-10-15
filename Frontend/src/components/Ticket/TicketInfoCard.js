import React, {useMemo, useState}from 'react';
import {NavLink, useParams, useNavigate, useLocation} from 'react-router-dom';
import {changeTicketStatus, useGetCustomer, useGetTicket,deleteTicket, useGetUser} from "../../hooks";
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
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';
import ChangeTicketStatusModal from './ChangeTicketStatusModal';

const TicketInfoCard = () => {


  const {id} = useParams()
  const {data: ticket, status} = useGetTicket(id);
  const navigate = useNavigate();

  function useGetSearchParams() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const searchParams = useGetSearchParams();
  console.log(searchParams)
  const customerId = searchParams.get('customerId')
  const ticketStatus = searchParams.get('ticketStatus')
  const userId = searchParams.get('userId')
  
  const [isTicketStatusModalOpen, setTicketStatusModalOpen] = useState(false);

  const steps = [
    { title: 'New Ticket', description: '' },
    { title: 'In Progress', description: '' },
    { title: 'Completed', description: '' },
  ]


  const {data: customer, status: customerStatus} = useGetCustomer(customerId);
  const {data: userData, status: userStatus} = useGetUser(userId);
  
  
  const ticketStatusList = useMemo(() => ["NEW", "IN_PROGRESS", "COMPLETED"], [])
  const statusIndex = ticketStatusList.indexOf(ticketStatus)  
  const {activeStep, setActiveStep } = useSteps({ index: statusIndex, count: steps.length})

  useEffect(() => {
    console.log(activeStep)
    const statusIndex = ticketStatusList.indexOf(ticketStatus)  
    setActiveStep(statusIndex)
  }, [ticketStatus, setActiveStep, ticketStatusList, activeStep])

  const queryClient = useQueryClient();



  const deleteMutation = useMutation({
    mutationFn: (id) => {
      deleteTicket(id)        
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["tickets", id])
      navigate("/tickets", {replace: true})
    }
  })
 
  
  if ((status !== "loading"|| customerStatus !== "loading" ) && (status === "success" && customerStatus === "success") && userStatus === "success") {
  
  


  console.log(customer)

    const info = {
      "Ticket ID: ": ticket.ticketId,
      "Subject: ": ticket.subject,
      "Created At: ": dayjs(ticket.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      "Finished At: ": dayjs(ticket.finishedAt).format("DD/MM/YYYY HH:mm:ss"),
      "Description: ": ticket.description,
    }

   const handleDelete = (event) => {
event.preventDefault()
deleteMutation.mutate(id)
   }

    return (
      <Skeleton isLoaded={status === 'success' || customerStatus === 'success'}>

        <Flex direction={"column"}>
          <Flex minwidth='max-content' p={15} m={15} alignItems='center' gap='2'>
            <Button leftIcon={<IoArrowBackOutline/>} size="lg" as={NavLink} to={"/tickets"} variant={"outline"} colorScheme={"teal"}
                        aria-label={"Back"}> Back</Button>
            <Spacer/>
            <ButtonGroup>
            <Button  variant={"outline"} colorScheme={"cyan"} size={"lg"} onClick={()=> setTicketStatusModalOpen(true)}>
                Change Status
              </Button>
              <ChangeTicketStatusModal
              isOpen={isTicketStatusModalOpen}
              onClose={() => setTicketStatusModalOpen(false)}
              ticket = {ticket}
              />
              <Button isDisabled variant={"outline"} colorScheme={"teal"} size={"lg"}>
                Edit
              </Button>
              <Button variant={"outline"} colorScheme={"red"} size={"lg"} onClick={handleDelete}>
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
            <Stepper  index={statusIndex+1} m={5}>
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
                          <Text>`User Name: {userData.name}` </Text>
                          <Text>`User Number: {userData.userNumber}` </Text>
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
