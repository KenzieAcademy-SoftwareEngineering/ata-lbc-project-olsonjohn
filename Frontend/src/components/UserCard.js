import {Box, CardContent, ListDivider} from "@mui/joy";
import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";


function UserCard(user) {
const { id, name,userNumber } = user.user
    return (
        <>
        <Card variant="outlined" sx={{display:"flex", minWidth:"360px",maxWidth:"460px" }} >
            <CardContent sx={{display:"flex", justifyContent:"space-around", flexDirection:"row", flexShrink:"0"}}>
                <Typography level="h3">{name} </Typography>

                <Typography level="h4">{userNumber}</Typography>
            </CardContent>
            <CardContent >
            <ListDivider  />
                <Typography level="body-lg">User Number: {userNumber}</Typography>
            </CardContent>
            <ListDivider />

            <Box xs={{marginTop:"5px",flexGrow:1}}>
                <Typography color="neutral" sx={{size:"20px", justifyItems:"center", textAlign:"right"}}>
                    {id}
                </Typography>
            </Box>
        </Card>
        </>
    )
}


export default UserCard