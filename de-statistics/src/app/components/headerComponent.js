"use client";
import { Button, ButtonGroup } from "@mui/material";
import styles from "./headerComponent.module.css";
import { usePrivy } from "@privy-io/react-auth";

export default function HeaderComponent() {
  const { ready, login, logout, authenticated } = usePrivy();
  return (
    <div className={styles.headerBar}>
      <div className={styles.logoContainer}>
        <img
          src="/logo.png"
          alt="App Logo"
          style={{
            height: "80%",
            width: "auto",
            objectFit: "contain",
          }}
        />
        <span className={styles.titleLogo}>DeStatistics</span>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        {ready && authenticated ? (
          <Button disabled={!ready} onClick={() => logout()}>Disconnect</Button>
        ) : (
          <Button disabled={!ready} onClick={() => login()}>Connect</Button>
        )}
      </ButtonGroup>
    </div>
  );
}
