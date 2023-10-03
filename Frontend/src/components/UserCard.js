import {Box, CardContent, Divider, ListDivider} from "@mui/joy";
import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import EditModal from "./Customer/EditModal";
import Avatar from "@mui/joy/Avatar";


function UserCard(user) {
    const {id, name, userNumber} = user.user
    return (
        <>
            <Card variant="soft" sx={{display: "flex", minWidth: "360px", maxWidth: "460px"}}>
                <CardContent>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
                        <Typography color='primary' variant='h1' component="div" sx={{bgcolor: "inherit"}}>
                            {name}
                        </Typography>

                        <EditModal/>
                    </Box>
                        <ListDivider/>
                    <Box sx={{display:"flex", alignContent:"center",justifyContent:"space-evenly", margin:"5px", padding:"10px"}} >
                    <Avatar src="https://placekitten.com/200/300" size="lg"/>
                    <Divider orientation="vertical"/>
                    <Typography color="textSecondary">
                        <strong>Number:</strong> {userNumber}
                    </Typography>
                    </Box>

                    <ListDivider/>

                    <Box xs={{marginTop: "5px", flexGrow: 1}}>
                        <Typography color="neutral" sx={{size: "20px", justifyItems: "center", textAlign: "right"}}>
                            {id}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}


export default UserCard