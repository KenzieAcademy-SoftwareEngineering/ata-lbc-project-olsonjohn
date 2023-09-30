import React from "react";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import UserCard from "./UserCard";
import {Await, useLoaderData} from "react-router-dom";
import Grid from "@mui/material/Grid";

function UserPage() {

    const {users} = useLoaderData();
    return (
        <>
            <Box>
                <Sheet sx={{display: "flex", flexDirection: "column", height: "700px"}}>

                    <Box>
                        <Typography level="body-lg">
                            This is the Main User Page
                        </Typography>{" "}
                    </Box>

                    <Await resolve={users}>
                        <Grid>
                            <Box sx={{display: "flex", justifyContent: "center", flexWrap:1, gap: "20px"}}>


                                {users.map((user) => (

                                    <UserCard item key={user.id} user={user}/>
                                ))
                                }

                            </Box>
                        </Grid>
                    </Await>
                </Sheet>
            </Box>
        </>
    )

}

export default UserPage;
