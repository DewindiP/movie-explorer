import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the current theme

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const theme = useTheme(); // Access the current theme

  return (
    <TextField
      fullWidth
      placeholder="Search Movies..."
      variant="outlined"
      value={searchQuery}
      onChange={onSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              style={{
                color: theme.palette.mode === "dark" ? "#ccc" : "#888", // Change icon color based on theme
              }}
            />
          </InputAdornment>
        ),
      }}
      style={{
        borderRadius: "30px",
        backgroundColor:
          theme.palette.mode === "dark" ? theme.palette.background.paper : "white", // Change background color based on theme
      }}
      sx={{
        maxWidth: 500,
        margin: "20px auto",
        "& fieldset": { border: "none" }, // Remove the border
        input: {
          padding: "10px 14px",
          color: theme.palette.text.primary, // Change input text color based on theme
        },
        boxShadow: 2,
      }}
    />
  );
};

export default SearchBar;