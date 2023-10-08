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
import { addCustomer } from "../../hooks";
export default function CustomerEditForm(props) {
  const { onClose } = props;
  const queryClient = useQueryClient();
 const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => {
      
      addCustomer(Object.fromEntries(formData.entries()));
      queryClient.refetchQueries(["customers"])
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      navigate("/customers", { replace: true });
     onClose();
    },
});

  const onSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(new FormData(event.target));
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
            type="text"
            placeholder="First Name"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Last Name" />
          <Input
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children="Email" />
          <Input
            name="emailAddress"
            type="text"
            placeholder="Email"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Address" />
          <Input
            name="address"
            type="text"
            placeholder="Address"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Phone Number" />
          <Input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
          />
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
