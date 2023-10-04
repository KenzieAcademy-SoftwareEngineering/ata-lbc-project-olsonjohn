import React from 'react'
import {ButtonGroup, Container, Divider, FormLabel, Input, Typography} from "@mui/joy";
import {Form} from "react-router-dom";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";


const UserEditForm = () => {

  const handleChange = () => {

  }
  return (
    <>
      <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column", gap: "4px"}}>

        <Typography label="h1" color="primary" sx={{textAlign: "center", border: "10px", padding: "5px"}}>
          Edit User Form
        </Typography>
        <Divider role="presentation"/>
        <Form>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormLabel>Name</FormLabel>
              <Input
                fullWidth
                label="name"
                variant="outlined"
                name="name"
                value=""
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <FormLabel>Number</FormLabel>
              <Input
                fullWidth
                label="User Number"
                variant="outlined"
                name="userNumber"
                value=""
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs={6}>

              <Button type="cancel" variant="soft" color="danger">
                Delete
              </Button>
            </Grid>
            <Grid xs={6}>
              <ButtonGroup spacing="2em" buttonFlex="0 1 200px">
                <Button type="submit" variant="outlined" color="warning">
                  Cancel
                </Button>
                <Button type="submit" variant="outlined" color="primary">
                  Submit
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Form>
      </Container>
    </>
  )

}


export default UserEditForm;