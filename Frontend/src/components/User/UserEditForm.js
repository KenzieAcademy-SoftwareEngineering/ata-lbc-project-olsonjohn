import React from 'react'
import {ButtonGroup, Container, Divider, FormLabel, Input, Skeleton, Typography} from "@mui/joy";
import {Form, redirect, useLoaderData, useNavigation, useParams, useRouteLoaderData} from "react-router-dom";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import axios from "axios";


function  UserEditForm() {
const { user } = useLoaderData();
console.log(user)
const navigation= useNavigation();

const params = useParams();

  return (
    <>
      <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column", gap: "4px"}}>
      <Skeleton loading={navigation.state==="loading"} >
        <Typography label="h1" color="primary" sx={{textAlign: "center", border: "10px", padding: "5px"}}>
          Edit User Form
        </Typography>
        <Divider role="presentation"/>
        <Form method="post" action={`/users/${params.id}/edit`}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormLabel>Name</FormLabel>
              <Input
                fullWidth
                label="name"
                variant="outlined"
                name="name"
                defaultValue={user.name}
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
                defaultValue={user.userNumber}
                required
              />
            </Grid>
            <Grid xs={6}>
              <Button variant="soft" color="danger">
                Delete
              </Button>
            </Grid>
            <Grid xs={6}>
              <ButtonGroup spacing="2em" buttonFlex="0 1 200px">
                <Button variant="outlined" color="warning">
                  Cancel
                </Button>
                <Button type="submit" variant="outlined" color="primary">
                  Submit
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Form>
      </Skeleton>
      </Container>
    </>
  )

}

export async function UpdateUserLoader({params}){
  console.log("Is this running?")
   const response = await axios.get(`http://localhost:5001/user/${params.id}`)
     .then(response => response.data)
  console.log(response)
  return {response};
}

 export async function UpdateUserAction({request, params}) {
  const data = await request.formData()
   const output = {
    name: data.get('name'),
     userNumber: data.get('userNumber')
   }
   console.log(output)
  return redirect(`/users/${params.id}`)
}

export default UserEditForm;