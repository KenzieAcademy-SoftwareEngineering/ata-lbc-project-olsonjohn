import React, { useMemo, useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Select,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    InputGroup,
} from "@chakra-ui/react";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { changeTicketStatus, getTicket, useGetTicket } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";

const ChangeTicketStatusModal = ({ isOpen, onClose}, props) => {
    const [newStatusValue, setNewStatusValue] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const changeStatusMutation = useMutation({
        mutationFn: async (id) => {
            const ticket1 = await getTicket(id)
            ticket1.ticketStatus = newStatusValue
            console.log("NewStatus:" + ticket1.ticketStatus)
            console.log("PassedIn Status"+ newStatusValue)
          changeTicketStatus(id, ticket1)
        },
        onSuccess: (id) => {
        queryClient.invalidateQueries(["tickets", id])
        navigate("/tickets", {replace: true})
        }
      })

 
  const {id: ticketId} = useParams()

  const { data: ticketData, status: ticketStatus } = useGetTicket(ticketId);

  const ticketStatusValues = ["NEW", "IN_PROGRESS", "COMPLETED"];

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = (new FormData(event.target))
    const formObject = Object.fromEntries(formData.entries())
     setNewStatusValue(formObject['select-status'])
    changeStatusMutation.mutate(ticketData.ticketId)
    onClose() ;
  }

  if (ticketStatus === "error") {
    return (
      <>
        <h1>Error</h1>
        <p>
          An error occurred while loading ticket Info. Please try again later.
        </p>
      </>
    );
  }
  if (ticketStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  if (ticketStatus === "success") {

    console.log("batman: " + ticketData)
    return (
        
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Ticket Status</ModalHeader>
          <form
          id="change-ticket-status"
          onSubmit={(event) => handleSubmit(event)}
          >
              <ModalBody>
           <InputGroup>
            <Select name="select-status" type="select" placeholder="Status" size="lg" onChange={(event) => setNewStatusValue(event.target.value)} >
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Select>
              </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}>
              Change
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
                  </form>
        </ModalContent>
      </Modal>
    );
  }
};

export default ChangeTicketStatusModal;
