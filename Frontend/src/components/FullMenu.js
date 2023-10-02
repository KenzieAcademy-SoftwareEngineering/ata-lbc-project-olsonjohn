import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { ListDivider, Typography } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/joy/Link";
import { closeMenu } from "../util/menuUtils";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Card";

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
          <ListSubheader role="presentation" sx={{ fontWeight: "lg" }}>
            Ticket Dashboard
          </ListSubheader>
          <ListDivider />
          <ListItem>
            <ListItemButton onClick={() => closeMenu()}>
              <ListItemDecorator>
                <BubbleChartIcon />
              </ListItemDecorator>
              <ListItemContent>
              <Link component={RouterLink} to="overview/">
                Overview
                </Link>
                </ListItemContent>

            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton onClick={() => closeMenu()}>
              <ListItemDecorator>🎫</ListItemDecorator>
              <ListItemContent>
              <Link component={RouterLink} to="tickets/">
                Tickets
                </Link>
                </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>🧍🏽</ListItemDecorator>
              <ListItemContent>
              <Link component={RouterLink} to="customers/">
                Customers
                </Link>
                </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton onClick={() => closeMenu()}>
              <ListItemDecorator>🧑‍💻</ListItemDecorator>
              <ListItemContent>
                <Link component={RouterLink} to="users/">
                  Users
                </Link>
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
