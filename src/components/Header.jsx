import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "../theme/ThemeContext";
import { Box } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const { toggleColorMode} = useColorMode();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: "blur(10px)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0,
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Cinzel', serif",
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "#BFD8B3" : "#FB773C",
              textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            CineScope
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontStyle: "italic",
              fontFamily: "'Cinzel', serif",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "white",
              textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
              mt: -0.5,
            }}
          >
            Discover Your Favourite Films
          </Typography>
        </Box>

        {/* Theme toggle icon */}
        <IconButton onClick={toggleColorMode} 
         sx={{
          color: theme.palette.mode === "dark" ? "#BFD8B3" : "#FB773C", // Custom colors for each mode
        }}>
          {theme.palette.mode === "dark" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
