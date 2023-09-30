import React from "react";
import useBearStore from "./store";
import FullMenu from "./components/FullMenu";
import Header from "./components/Header";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import {
  CssVarsProvider,
  Divider,
  Typography,
  Button,
  ButtonGroup,
  Sheet,
} from "@mui/joy";
import { Outlet } from "react-router-dom";
import { extendTheme, useColorScheme } from "@mui/joy/styles";
import {useNavigation} from "react-router-dom";
const App = (props) => {
    const navigation = useNavigation();
 
  const theme = extendTheme({
    cssVarPrefix:'md-demo',});

  return (
    <>
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Header />
          <FullMenu />
          <Box
            component="main"
            className={navigation.state === "loading" ? "loading" : "" }
            sx={{
              px: {
                xs: 2,
                md: 6,
              },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: {
                xs: 2,
                sm: 2,
                md: 3,
              },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100vh",
              gap: 1,
            }}
          >
            <Sheet
            
              sx={{ margin:"10px", padding:"10px", display: "flex", justifyContent: "center", alignItems:"center" }}
            >

              <Typography color="primary" level="h1" width={"80%"} textAlign={"center"} boxShadow={true}>
                Ticket Tracker
              </Typography>
              <Divider vertical />
              <ButtonGroup
                color="success"
                disabled={false}
                orientation="vertical"
                size="lg"
                spacing={2}
                variant="soft"
              >

                <CssVarsProvider theme={theme}>
                 <Button
      variant="outlined"
      color="neutral">
                  <Typography level="body-md">Light | Dark</Typography>
    </Button>
    </CssVarsProvider>
                <Button
                  color="danger"
                  size="lg"
                  sz={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography level="body-md">Login</Typography>
                </Button>
              </ButtonGroup>
            </Sheet>
            <Divider />
            <Outlet />
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
};

export default App;
