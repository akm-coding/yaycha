import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "react-query";
import { fetchSearch } from "../libs/fetcher";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FollowButton } from "../components";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 500);

  const { isLoading, isError, error, data } = useQuery(
    ["search", debouncedQuery],
    () => {
      return fetchSearch(debouncedQuery);
    }
  );

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <TextField
        fullWidth={true}
        variant="outlined"
        placeholder="Search user"
        onKeyUp={(e) => {
          setQuery(e.target.value);
        }}
      />
      {isLoading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>Loading...</Box>
      ) : (
        <List>
          {data.map((user) => {
            return (
              <ListItem key={user.id}>
                <ListItemButton
                  onClick={() => navigate(`/profile/${user?.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} secondary={user?.bio} />
                  <ListItemSecondaryAction>
                    <FollowButton user={user} />
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
