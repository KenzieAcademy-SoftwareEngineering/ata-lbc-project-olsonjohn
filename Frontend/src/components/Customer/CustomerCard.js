import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Button, CardActions, ListDivider } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal'; 
import CustomerForm from './CustomerForm';
import { Icon } from '@iconify/react';
import EditModal from "./EditModal";
function CustomerCard({ customer }) {
  const { id, firstName, lastName, streetAddress, city, state, zip, emailAddress, phoneNumber } = customer;

  return (
    <Card variant="soft" sx={{display:"flex",minWidth:"360px",maxWidth:"460px" }}>
      <CardContent >
        <Box sx={{display:"flex", justifyContent:"space-between", alignContent:"center"}}>
        <Typography color='primary' variant='h1' component="div" sx={{bgcolor:"inherit"}}>
          {firstName} {lastName}
        </Typography>

        <EditModal />
        </Box>
        <ListDivider  />
        <Typography color="textSecondary">
          <strong>Address:</strong> {streetAddress}, {city}, {state} {zip}
        </Typography>
        <Typography color="textSecondary">
          <strong>Email:</strong> {emailAddress}
        </Typography>
        <Typography color="textSecondary">
          <strong>Phone:</strong> {phoneNumber}
        </Typography>
          
          
        <ListDivider />
          
        <Box xs={{marginTop:"5px",flexGrow:1}}>
        <Typography color="neutral" sx={{size:"20px", justifyItems:"center", textAlign:"right"}}>
          {id}
        </Typography>
          </Box>
      </CardContent>
    </Card>
  );
}

export default CustomerCard;
