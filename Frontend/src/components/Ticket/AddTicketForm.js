import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Button,
  ButtonGroup,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { addTicket, useGetUsers } from "../../hooks";
import CustomerSearchModal from "./CustomerSearchModal";
import { useDrag } from "react-aria";
import UserMultiSelect from "./UserMultiSelect";

export default function AddTicketForm(props) {
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const { onClose } = props;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const handleCustomerSelect = (customerId) => {
    console.log(customerId)
    setSelectedCustomerId(customerId);
    setCustomerModalOpen(false);
  };
  
  const mutation = useMutation({
    mutationFn: (formData) => {
      addTicket(formData);
      queryClient.refetchQueries(["tickets"]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets"]);
      navigate("/tickets", { replace: true });
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData.entries())
    const {userId} = formObject;
    formObject.userId = [userId]
    console.log(formObject)
    mutation.mutate(formObject);
  };

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [users, setUsers] = useState("");


  const [userOptions, setUserOptions] = useState([]);
    
  const { data: usersData, status: userStatus } = useGetUsers();
  

  return (
    <>
    <Container w="max-content" >

      <form
        id="ticket-add-form"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <InputGroup mb={4}>
          <InputLeftAddon children="Ticket Subject" />
          <Input
            name="ticketSubject"
            type="text"
            placeholder="Enter Ticket Subject"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            />
        </InputGroup>
        <InputGroup mb={4}>
          <InputLeftAddon children="Ticket Description" />
          <Input
            name="ticketDescription"
            type="text"
            placeholder="Enter Ticket Description"
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            />
        </InputGroup>

        {!selectedCustomerId || customerId ? (
          <>
            <Button onClick={() => setCustomerModalOpen(true)}>
              Search Customers
            </Button>
            <CustomerSearchModal
              isOpen={isCustomerModalOpen}
              onClose={() => setCustomerModalOpen(false)}
              onCustomerSelect={handleCustomerSelect}
              />
          </>
        ) : (
          <InputGroup mb={4} flexDirection={'column'}>
            <InputGroup >
            <InputLeftAddon children="Customer ID" />
            <Input
              name="customerId"
              type=""
              placeholder="Enter Customer ID"
              value={selectedCustomerId[0].value}
              readOnly="true"
              onChange={(e) => setCustomerId(e.target.value)}
              />
              </InputGroup>
              <InputGroup>
            
              <InputLeftAddon children="Customer Name" />
            <Input
              name="customerName"
              type=""
              placeholder=""
              readOnly="true"
              value={selectedCustomerId[0].label}
              onChange={(e) => setCustomerId(e.target.value)}
              />
              </InputGroup>
          </InputGroup>
        )}
 <InputGroup>
            <InputLeftAddon children="User" />
            <Select
              name="userId"
              type="select"
              placeholder="Select a User"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              >

{
  usersData? 
  usersData.map((user) => {
    return (
      <option key={user.userId} value={user.userId}> {user.userNumber}: {user.name}</option>
      )
    }) : null
}
</Select>

          </InputGroup>

        <ButtonGroup>
          <Spacer />
          <Button
            size="sm"
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"green.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
            colorScheme="green"
            variant="solid"
            type="submit"
            form="ticket-add-form">
            Save
          </Button>
        </ButtonGroup>
      </form>
              </Container>
    </>
  );
}
