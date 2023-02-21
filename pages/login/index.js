import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import LoginLayout from "../../components/layout/LoginLayout";

import { Typography } from "@mui/material";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "./login.module.css";
import styled from "@emotion/styled";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled(Paper)(({ theme }) => ({
  width: "25%",
  height: "fit-content",
  padding: "1rem",
}));

import { login } from "../../store/auth/thunks";
import { fetchUser } from "../../store/user/thunks";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { access_token, error } = useSelector((state) => state.auth);

  const { isLoading, username } = useSelector((state) => state.user);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const first_step = dispatch(login({ email, password }));
      const second_step = await Promise.all([first_step]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!access_token) return;

    dispatch(fetchUser());

    // check if user data is fetched
    if (username) {
      router.push("/");
    }
  }, [access_token, username]);

  return (
    <div className={styles["container"]}>
      <Container sx={{ boxShadow: 3 }}>
        <Stack spacing={3}>
          <Stack alignItems="center">
            <Typography
              variant="h6"
              component="h1"
              color="#9a9c9e"
              fontWeight="medium"
              fontSize={14}
            >
              WELCOME BACK
            </Typography>

            <Typography variant="h3" fontWeight="medium" fontSize={20}>
              Login to your account
            </Typography>
          </Stack>

          <form>
            <TextField
              variant="outlined"
              id="email"
              label="Email"
              fullWidth
              inputRef={emailRef}
              margin="normal"
            />
            <TextField
              variant="outlined"
              id="password"
              label="Password"
              fullWidth
              inputRef={passwordRef}
              margin="normal"
              type="password"
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                size="large"
                fullWidth
                sx={{ marginTop: "1rem" }}
              >
                {isLoading ? <CircularProgress size={20} /> : "Login"}
              </Button>
            </div>
          </form>

          <Typography
            variant="h6"
            component="h1"
            color="error"
            fontWeight="medium"
            fontSize={14}
          >
            {error && "Invalid credentials."}
          </Typography>
        </Stack>
      </Container>
    </div>
  );
};

export default Login;

Login.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
