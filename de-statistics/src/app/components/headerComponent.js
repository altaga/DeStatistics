"use client";
import { Button, ButtonGroup } from "@mui/material";
import styles from "./headerComponent.module.css";

export default function HeaderComponent() {
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
        <Button>Connect Wallet</Button>
        <Button>Privy Login</Button>
      </ButtonGroup>
    </div>
  );
}
