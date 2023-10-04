import React from "react";

import Box from "@mui/joy/Box";
import UserCard from "./UserCard";
import {Await, NavLink, Outlet, useLoaderData, useNavigation} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Divider, Skeleton} from "@mui/joy";
import PageHeader from "./PageHeader";
import axios from "axios";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";


export function UserPage() {
  const navigation = useNavigation();
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

        </Box>
        <Box sx={{
          display: "flex",
          gap: "10px",
        }}>

          <Grid container sx={{maxWidth: "2600px", display: "flex", justifyContent: "center", gap: "30px"}}>

            <Await resolve={users}>
              <Skeleton loading={navigation.state === 'loading'}>
                <List>
                  {users.map((user) => {
                    const {userId} = user;
                    return (
                      <ListItem key={`${userId}`}as={NavLink} to={`/users/${userId}`}
                                sx={{
                                  textDecoration: "none",
                                }}
                      >
                        <UserCard key={user.id} user={user}/>
                      </ListItem>
                    )
                  })}
                </List>
              </Skeleton>
            </Await>
          </Grid>
          <Divider orientation="vertical"/>
          <Outlet/>
        </Box>
      </Box>
    </>
  )
}


export async function usersLoader() {
  const users = await axios.get("http://localhost:5001/user/all")
    .then((response) => response.data)
  console.log(users)
  return {users}
}
