import React from "react";
import Grid from '@mui/material/Grid';
import CustomerCard from './Customer/CustomerCard'
import {TextField, Input, FormLabel, Sheet, Autocomplete, Box, Typography, Skeleton} from '@mui/joy'
import {Await, useLoaderData} from "react-router-dom";

function CustomerPage() {
    const [loading, setLoading] = React.useState(false);

const {customers} = useLoaderData();

    return (
        <>
        <Box sx={{display:"flex", alignContent:"center", justifyContent:'center', flexDirection:"column"}}>
        <Typography level="h2"
                      sx={{margin:"10px", textAlign:'center', textDecoration:"underlined"}}>
         Customer List
          </Typography>
          <Sheet sx={{elevation:850, margin:"10px", padding:"10px", borderRadius:"10px"}}>

            <Input placeholder="Search" sx={{ '--Input-focused': 1, width: 256 }} />
            </Sheet>
        <Grid container sx={{maxWidth:"2600px",display:"flex", justifyContent:"center", gap:"30px"}}>
          <Await resolve={customers}>

        <Skeleton loading={loading}>
      { customers.map ((customer) => (
        <Grid item key={customer.id} >
          <CustomerCard customer={customer} />
        </Grid>
      ))}
        </Skeleton>
          </Await>
    </Grid>
    </Box>
        </>
    )
}

export default CustomerPage;