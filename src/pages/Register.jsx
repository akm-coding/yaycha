import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useApp } from "../context/ThemedApp";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postUser } from "../libs/fetcher";

export default function Register() {
  const { setGlobalMsg } = useApp();

  const nameInput = useRef();
  const usernameInput = useRef();
  const bioInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const name = nameInput.current.value;
    const username = usernameInput.current.value;
    const bio = bioInput.current.value;
    const password = passwordInput.current.value;

    if (!name || !username || !password) {
      setError("Name, username and password required");
      return false;
    }
    create.mutate({ name, username, bio, password });
  };

  const create = useMutation(async (data) => postUser(data), {
    onError: async () => {
      setError("Cannot create account");
    },
    onSuccess: async (user) => {
      setGlobalMsg("Account Created");
      navigate("/login");
    },
  });

  return (
    <Box>
      <Typography variant="h3">Register</Typography>
      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <TextField inputRef={nameInput} placeholder="Name" fullWidth />
          <TextField
            inputRef={usernameInput}
            placeholder="Username"
            fullWidth
          />
          <TextField inputRef={bioInput} placeholder="Bio" fullWidth />
          <TextField
            inputRef={passwordInput}
            type="password"
            placeholder="Password"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}
