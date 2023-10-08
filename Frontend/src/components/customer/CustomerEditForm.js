import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  ButtonGroup,
  Spacer,
} from "@chakra-ui/react";
import { editCustomer, deleteCustomer, useGetCustomers } from "../../hooks/useCustomers";
export default function CustomerEditForm(props) {
  const { data, onClose, id } = props;
  const queryClient = useQueryClient();
 const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => {
      return editCustomer(id, Object.fromEntries(formData.entries()));
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["customers"], id);
      queryClient.invalidateQueries(["customers"]);
     onClose();
    },
});

const deleteMutation = useMutation({
    mutationFn: (id) => {
        deleteCustomer(id);
        queryClient.refetchQueries(["customers"])
    },
    onSuccess: (id) => {
       queryClient.invalidateQueries(["customers", id]);
        navigate("/customers", { replace: true });

    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(new FormData(event.target));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteMutation.mutate(id);
  
  };

  return (
    <>
      <form
        id="customer-edit-form"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <InputGroup>
          <InputLeftAddon children="First Name" />
          <Input
            name="firstName"
            defaultValue={`${data.firstName}`}
            type="text"
            placeholder="First Name"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Last Name" />
          <Input
            name="lastName"
            defaultValue={`${data.lastName}`}
            type="text"
            placeholder="Last Name"
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children="Email" />
          <Input
            name="emailAddress"
            defaultValue={`${data.emailAddress}`}
            type="text"
            placeholder="Email"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Address" />
          <Input
            name="address"
            defaultValue={`${data.address}`}
            type="text"
            placeholder="Address"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Phone Number" />
          <Input
            name="phoneNumber"
            type="tel"
            defaultValue={`${data.phoneNumber}`}
            placeholder="Phone Number"
          />
        </InputGroup>
        <ButtonGroup>
          <Button
            size="sm"
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"red.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
            colorScheme="red"
            disabled={true}
            variant="solid"
            onClick={handleDelete}>
            Delete
          </Button>
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
            disabled={true}
            variant="solid"
            type="submit"
            form="customer-edit-form">
            Save
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}
