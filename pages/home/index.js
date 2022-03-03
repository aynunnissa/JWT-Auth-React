import { useState, useEffect, useContext } from "react";
import styles from "./home.module.css";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { client } from "../../libs/client";
import AuthContext from "../store/auth-context";
import Button from "@mui/material/Button";

const Home = () => {
  const [content, setContent] = useState("");
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  async function fetch() {
    const response = await client.get("/hello");
    if (response.status === 200) {
      setContent(response.data);
    } else {
      alert("Unauthorized Access");
      router.push("/");
    }
  }
  useEffect(() => {
    // Update the document title using the browser API
    fetch();
  }, []);

  const logoutHandler = () => {
    authCtx.onLogout();
    router.push("/");
  };

  return (
    <Container className={styles.wrapper}>
      <Stack spacing={2}>
        <h1 className={styles.title}>{content}</h1>
        <Button
          className={styles.button}
          onClick={logoutHandler}
          variant="contained"
        >
          Logout
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
