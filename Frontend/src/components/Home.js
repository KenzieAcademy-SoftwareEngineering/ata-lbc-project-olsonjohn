import React from "react";
import {Sheet, Button, Typography} from "@mui/joy";
import {ToastContainer, toast} from 'react-toastify';


function Home() {

  const notify = () => toast("Login Not Implemented Yet"); 

  return (
    <>
    <Sheet>
    <Button color="danger" variant="outlined" size="sm" sz={{display: "flex", flexDirection: 'row', alignItems: 'center',}} onClick={notify}>
        <Typography level="body-md">Login</Typography>
        </Button>
      </Sheet>
      {/* <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={}>
        </Grid>
        <Grid xs={10}>
     
       </Grid>
      </Grid> */}
    </>
  );
}
export default Home;
