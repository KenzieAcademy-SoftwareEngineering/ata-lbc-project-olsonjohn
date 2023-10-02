import React from "react";
import Grid from '@mui/material/Grid';
import CustomerCard from './Customer/CustomerCard'
import {Autocomplete, Box, FormControl, Sheet, Skeleton} from '@mui/joy'
import {Await, useLoaderData} from "react-router-dom";
import PageHeader from "./PageHeader";

function CustomerPage() {
  const [loading, setLoading] = React.useState(false);

  const {customers} = useLoaderData();

  return (
    <>
      <Box sx={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "column"
      }}>
        <Box sx={{display: "flex", padding: "15px", margin: "20px", alignItems: "center"}}>

          <PageHeader message="Customer List" sx={{flexShrink: "1", minWidth: "266px"}}/>

          <Sheet sx={{elevation: 850, margin: "10px", padding: "10px", borderRadius: "10px"}}>
            <FormControl>
              <Autocomplete
                placeholder="Search for Customer"
                type="search"
                freeSolo
                disableClearable
                options={customers.map((option) => option.firstName + " " + option.lastName)}/>
            </FormControl>
          </Sheet>
        </Box>
        <Grid container sx={{maxWidth: "2600px", display: "flex", justifyContent: "center", gap: "30px"}}>
          <Await resolve={customers}>

            <Skeleton loading={loading}>
              {customers.map((customer) => (
                <Grid item key={customer.id} sx={(theme) => ({
                  boxShadow: theme.shadow.md,
                  '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                  '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                })}>
                  <CustomerCard customer={customer}/>
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