import React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import IconButton from '@mui/material/IconButton';
import { toggleMenu } from "../util/menuUtils";
import { ReceiptLong } from "@mui/icons-material";


function Header() {
  return (
    <>
      <Sheet
        sx={{
          display: { xs: "flex", md: "none" },
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
          '--Header-height': '52px',
          [theme.breakpoints.up('md')]: {
            '--Header-height': '0px',
          },
        },
      })}
    />
        <IconButton
        onClick={() => toggleMenu()}
        >
        <ReceiptLong />
        </IconButton>
      </Sheet>
    </>
  );
}

export default Header;
