import { Skeleton } from "@chakra-ui/react";
import React from "react";

function FallBackRoute() {
  return (
    <>
      <Skeleton variant="rectangular" sx={{ height: 300 }} />
    </>
  );
}

export default FallBackRoute;
