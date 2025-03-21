"use client";
import { ThemeProvider } from "@emotion/react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    myButton: {
      dark: lightGreen[150],
      main: lightBlue[100],
      light: lightBlue[50],
    },
    executeButton: {
      main: lightBlue[300],
    },
  },
});

export default function Providers({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
