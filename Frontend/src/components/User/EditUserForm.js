import React from "react";
import { useAddUser } from "../../hooks";
import { Button } from "@chakra-ui/react";

function EditUserForm() {
  const onSubmit = (event) => {
    event.preventDefault();
    let userData = {
      name: "",
    };
    useAddUser.mutate(userData);
  };

  return (
    <>
      <form method="PUT">
        <Button type="submit" onClick={onSubmit} value="Submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default EditUserForm;
