import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { ListDivider } from "@mui/joy";
import { NavLink} from "react-router-dom";
import { closeMenu } from "../util/menuUtils";

function FullMenu() {


  return (
    <>
      <Box
        className="FullMenu-overlay"
        sx={{
          marginTop:"calc(12px +var(--Header-height))",
          position: "fixed",
          zIndex: 9998,
            top: "calc(12px +var(--Header-height))",
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeMenu()}
      />
      <Sheet
        className="FullMenu"
        color="neutral"
        sx={{
          position: {
            xs: "fixed",
            lg: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
            lg: "none",
          },
          transition: "transform 0.4s",
          zIndex: 9999,
          height: "100dvh",
            top: "calc(5px +var(--Header-height))",
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <List
          size="lg"
          sx={{
            "--ListItem-radius": "6px",
            "--List-gap": "6px",
          }}
        >

          <ListItem>
            <ListItemButton onClick={() => closeMenu()}>
              <ListItemDecorator>
                <BubbleChartIcon />
              </ListItemDecorator>
              <ListItemContent>
              <NavLink to="/" sx={{
                textDecoration: "none",
              }}>
                Home
                </NavLink>
                </ListItemContent>

            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton onClick={() => closeMenu()}>
              <ListItemDecorator>🎫</ListItemDecorator>
              <ListItemContent>
              <NavLink to="tickets/"  sx={{
                textDecoration: "none",
              }}>
                Tickets
                </NavLink>
                </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>🧍🏽</ListItemDecorator>
              <ListItemContent>
              <NavLink to="customers/"  sx={{
                textDecoration: "none",
              }}>
                Customers
                </NavLink>
                </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton onClick={() => closeMenu()}>
              <ListItemDecorator>🧑‍💻</ListItemDecorator>
              <ListItemContent>
                <NavLink to="users/"  sx={{
                  textDecoration: "none",
                }}>
                  Users
                </NavLink>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <ListDivider />
        <List>

        </List>
      
      </Sheet>
    </>
  );
}

export default FullMenu;
