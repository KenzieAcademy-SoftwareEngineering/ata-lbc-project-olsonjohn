import {Box, CardContent, Divider, ListDivider} from "@mui/joy";
import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

function UserCard(user) {
    const {name, userNumber} = user.user
    console.log(user)
    return (
        <>
            <Card variant="soft" sx={{display: "flex", minWidth: "360px", maxWidth: "460px"}}>
                <CardContent>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
                        <Typography color='primary' variant='h1'>
                          {name}
                        </Typography>
                        <Divider orientation={'vertical'} />
                    <Typography color="" >
                        <strong>Number:</strong> {userNumber}
                    </Typography>
                       </Box>
                </CardContent>
            </Card>
        </>

    )
}


export default UserCard