import React, { createContext, useMemo, useState, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

// Create a context
const ColorModeContext = createContext();

// Custom hook to access the color mode context
export const useColorMode = () => useContext(ColorModeContext);

// Define light and dark theme settings
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#f4f4f4",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#621940",
            secondary: "#ffffff",
          },
          primary: {
            main: "#A678B4",
          },
        }
      : {
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#621940",
            secondary: "#ffffff",
          },
          primary: {
            main: "#A678B4",
          },
        }),
  },
  typography: {
    fontFamily: `"Calibri", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

const ThemeProvider = ({ children }) => {
  // Use system preference as default
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  // Toggle color mode function
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    // Provide the color mode context to the app
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
