"use client";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme } from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";
import { PrivyProvider } from "@privy-io/react-auth";

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
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APPID}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENTID}
      config={{
        appearance: {
          // Defaults to 'light'
          theme: 'dark',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PrivyProvider>
  );
}
