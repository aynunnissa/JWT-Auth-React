import React, { useRef } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

import AuthContext from "./store/auth-context";

import Head from "next/head";
import Stack from "@mui/material/Stack";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();
  const authCtx = React.useContext(AuthContext);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  if (authCtx.isLoggedIn) {
    router.push("/home");
  }
  const login = () => {
    const usernameValue = usernameInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    authCtx.onLogin(usernameValue, passwordValue);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box className={styles.wrapper}>
          <Stack spacing={2}>
            <TextField
              inputRef={usernameInputRef}
              id="username-field"
              label="Username"
              variant="filled"
            />
            <TextField
              inputRef={passwordInputRef}
              id="pass-field"
              label="Password"
              htmlFor="password"
              type="password"
              variant="filled"
            />
            <Button onClick={login} variant="contained">
              Submit
            </Button>
          </Stack>
          {authCtx.isLoading && (
            <p style={{ textAlign: "center" }}>Loading...</p>
          )}
          {authCtx.loginError && (
            <p style={{ textAlign: "center", color: "red" }}>
              Login unsuccessful
            </p>
          )}
        </Box>
      </Container>
    </>
  );
}
