import { Skeleton } from "@mui/joy";
import React from "react";



function FallBackRoute() {
    return (
        <>
         <Skeleton variant="rectangular" sx={{ height: 300 }} />
        </>
    )
}       

export default FallBackRoute;
