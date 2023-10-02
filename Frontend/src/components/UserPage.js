import  React from "react";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import UserCard from "./UserCard";
import {Await, useLoaderData} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Input, Skeleton} from "@mui/joy";
import PageHeader from "./PageHeader";
function UserPage() {
    const [loading, setLoading] = React.useState(false);
    const {users} = useLoaderData();
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

                    <PageHeader message="User List" sx={{flexShrink: "1", minWidth: "266px"}}/>

                    <Sheet sx={{elevation: 850, margin: "10px", padding: "10px", borderRadius: "10px"}}>

                        <Input placeholder="Search" sx={{'--Input-focused': 1, width: 256}}/>
                    </Sheet>
                </Box>
                <Grid container sx={{maxWidth: "2600px", display: "flex", justifyContent: "center", gap: "30px"}}>

                    <Await resolve={users}>
                        <Skeleton loading={loading}>

                            {users.map((user) => (
                                <Grid item key={user.id} sx={(theme) => ({
                                        boxShadow: theme.shadow.md,
                                        '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                                        '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                                    })}>
                                    <UserCard item key={user.id} user={user}/>
                                </Grid>

                            ))}
                        </Skeleton>
                    </Await>
                </Grid>
            </Box>
        </>
    )
}

export default UserPage;
