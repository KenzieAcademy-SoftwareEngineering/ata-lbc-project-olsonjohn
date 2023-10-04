import React from "react";
import {NavLink, useParams, useRouteLoaderData} from "react-router-dom";
import {Box, Typography, Divider, CardContent, ListDivider} from "@mui/joy";
import Card from "@mui/joy/Card";
import EditModal from "./Customer/EditModal";
import Avatar from "@mui/joy/Avatar";
import UserEditModal from "./User/UserEditModal";
import {Icon} from "@iconify/react";
import Button from "@mui/joy/Button";
export function UserDetail() {

  const currentId = useParams().id
  const userList = useRouteLoaderData("users").users
  const user = userList.find(({userId}) => userId === currentId)
  const { userId, name, userNumber } = user;
  return (
    <>

    <Box>
      <Typography level="h2">User Detail Page </Typography>
      <Card variant="soft" sx={{display: "flex", minWidth: "360px", maxWidth: "460px"}}>
        <CardContent>
          <Box sx={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
            <Typography>
              {name}
            </Typography>
            <Button as={NavLink} to={`/users/${currentId}/edit`}>  <Icon icon="basil:edit-solid" /></Button>
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
              {userId}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </>
  )

}
