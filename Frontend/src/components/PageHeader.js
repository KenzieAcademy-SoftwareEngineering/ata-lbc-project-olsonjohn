import React from "react";
import {Typography, Sheet} from "@mui/joy";


const PageHeader = (props) => {

    return (
        <Sheet  sx={(theme) => ({
            boxShadow: theme.shadow.md,
            '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
            '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
            margin:"10px", padding:"10px", display: "flex", justifyContent: "center", alignItems:"center",
            minWidth:"266px"
        })}>

            <Typography color="primary" level="h1" width={"80%"} textAlign={"center"} boxShadow={true}>
                {props.message}
            </Typography>
        </Sheet>
    )
}

export default PageHeader