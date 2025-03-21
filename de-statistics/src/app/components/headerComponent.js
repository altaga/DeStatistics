"use client";
import { Button, ButtonGroup } from "@mui/material";
import styles from "./headerComponent.module.css";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";

export default function HeaderComponent() {
  const { ready, login, logout, authenticated, user } = usePrivy();

  useEffect(() => {
    if (authenticated) {
      console.log(user.wallet.address);
    }
  }, [authenticated]);

  return (
    <div className={styles.headerBar}>
      <div className={styles.logoContainer} onClick={() => window.location.href = "/"}>
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
      <div className={styles.logoContainer}>
        {authenticated ? (
          <span className={styles.address}>
            {" "}
            {user.wallet.address.substring(0, 6)}...
            {user.wallet.address.substring(user.wallet.address.length - 4)}
          </span>
        ) : (
          <span />
        )}
        <ButtonGroup variant="contained" aria-label="Basic button group">
          {ready && authenticated ? (
            <Button disabled={!ready} onClick={() => logout()}>
              Disconnect
            </Button>
          ) : (
            <Button disabled={!ready} onClick={() => login()}>
              Connect
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}
