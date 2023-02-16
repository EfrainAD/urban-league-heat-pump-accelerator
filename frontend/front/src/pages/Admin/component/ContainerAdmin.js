import { Box, Container, Typography } from "@mui/material";
import React from "react";

const ContainerAdmin = (props) => {
  return (
    <Container style={{ maxWidth: 2000 }}>
      <Box display="flex" justifyContent="center" alignItems="center" m={3}>
        <Typography variant="h3">{props.name}</Typography>
      </Box>

      {props.children}
    </Container>
  );
};

export default ContainerAdmin;
