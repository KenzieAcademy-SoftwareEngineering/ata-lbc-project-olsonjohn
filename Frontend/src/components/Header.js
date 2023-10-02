import React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import IconButton from '@mui/material/IconButton';
import { toggleMenu } from "../util/menuUtils";
import { ReceiptLong } from "@mui/icons-material";
import {Button, ButtonGroup, CssVarsProvider, Divider, Typography} from "@mui/joy";


function Header() {
  return (
    <>
      <Sheet
        sx={{
          display: { xs: "flex",},
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "var(--Header-height)",
          zIndex: 9995,
          p: 2,
          gap: 1,
          borderBottom: "1px solid",
          borderColor: "background.level1",
          boxShadow: "sm",
        }}
      ><GlobalStyles
      styles={(theme) => ({
        ':root': {
          '--Header-height': '65px',
        },
      })}
    />
        <IconButton
        onClick={() => toggleMenu()}
        >
        <ReceiptLong />
        </IconButton>
          <Divider orientation="vertical" />
          <Typography color="primary" level="h1" width={"80%"} textAlign={"center"} boxShadow={true}>
              Ticket Tracker
          </Typography>

          <Divider orientation="vertical" />
          <ButtonGroup
              color="success"
              disabled={false}
              orientation="horizontal"
              size="lg"
              spacing={2}
              variant="soft"
          >
                  <Button
                      variant="outlined"
                      color="neutral" sx={(theme) => ({
                      boxShadow: theme.shadow.md,
                      '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                      '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                  })}>
                      <Typography level="body-sm">Light | Dark</Typography>
                  </Button>
              <Button
                  color="danger"
                  size="lg"
                  sx={(theme) => ({
                      boxShadow: theme.shadow.md,
                      '--joy-shadowChannel': theme.vars.palette.danger.mainChannel,
                      '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                  })} >
                  <Typography level="body-sm">Login</Typography>
              </Button>
          </ButtonGroup>
      </Sheet>
    </>
  );
}

export default Header;
