import React from "react";
import { useAddUser } from "../../hooks";
import { Button } from "@chakra-ui/react";

function AddUserForm() {
  const onSubmit = (event) => {
    event.preventDefault();
    let userData = {
      name: "",
    };
    useAddUser.mutate(userData);
  };

  return (
    <>
      <form method="POST">
        <Button type="submit" onClick={onSubmit} value="Submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default AddUserForm;
