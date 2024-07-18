import React from "react";
import { useApp } from "../src/context/ThemedApp";
import { Box, Container, Snackbar } from "@mui/material";
import { AppDrawer, Header } from "./components";
import { Outlet } from "react-router-dom";

export default function Template() {
  const { globalMsg, setGlobalMsg } = useApp();

  return (
    <Box>
      <Header />
      <AppDrawer />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        open={Boolean(globalMsg)}
        autoHideDuration={6000}
        onClose={() => setGlobalMsg(null)}
        message={globalMsg}
      />
    </Box>
  );
}
