import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import {Divider, FormLabel, Input} from "@mui/joy";
import Typography from "@mui/joy/Typography";


function CustomerForm() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    emailAddress: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send the data to a server or perform actions.
    console.log('Form data:', formData);
  };

  return (
      <>
      <Typography label="h1" sx={{textAlign:"center"}} >Edit Customer Form</Typography>
      <Divider role="presentation"/>
    <Container maxWidth="sm" sx={{borderRaidus:"30px"}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel>First Name</FormLabel>
            <Input
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Last Name</FormLabel>

            <Input
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Street Address</FormLabel>

            <Input
              fullWidth
              label="Street Address"
              variant="outlined"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel>City</FormLabel>

            <Input
              fullWidth
              label="City"
              variant="outlined"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel>State</FormLabel>

            <Input
              fullWidth
              label="State"
              variant="outlined"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel>Zip Code</FormLabel>

            <Input
              fullWidth
              label="Zip Code"
              variant="outlined"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Email</FormLabel>

            <Input
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Phone Number</FormLabel>

            <Input
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>

            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </>
  );
}

export default CustomerForm;
