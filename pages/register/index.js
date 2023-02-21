import { useState, useRef } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import LoginLayout from "../../components/layout/LoginLayout";

import { Typography } from "@mui/material";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "./register.module.css";
import styled from "@emotion/styled";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Container = styled(Paper)(({ theme }) => ({
  width: "50%",
  height: "fit-content",
  padding: "1rem",
}));

const Register = () => {
  const router = useRouter();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;

    const fullName = `${firstName} ${lastName}`;

    const user = {
      email,
      password,
      fullName,
    };

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/auth/register", user);
      if (res.status === 200) router.push("/login");
    } catch (err) {
      setError(err.response.data.error);
    }

    setLoading(false);
  };

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
              WELCOME
            </Typography>

            <Typography variant="h3" fontWeight="medium" fontSize={20}>
              Create a new account
            </Typography>
          </Stack>

          <form>
            <Box>
              <Typography
                variant="h6"
                component="h1"
                color="#9a9c9e"
                fontWeight="medium"
                fontSize={14}
              >
                Personal Information
              </Typography>

              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  id="first_name"
                  label="First Name"
                  size="small"
                  margin="dense"
                  inputRef={firstNameRef}
                />

                <TextField
                  variant="outlined"
                  id="last_name"
                  label="Last Name"
                  size="small"
                  margin="dense"
                  inputRef={lastNameRef}
                />
              </Stack>
            </Box>

            <Box sx={{ marginTop: 4 }}>
              <Typography
                variant="h6"
                component="h1"
                color="#9a9c9e"
                fontWeight="medium"
                fontSize={14}
              >
                Account Information
              </Typography>

              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  id="email"
                  label="Email"
                  size="small"
                  margin="dense"
                  inputRef={emailRef}
                />

                <TextField
                  variant="outlined"
                  id="password"
                  label="Password"
                  size="small"
                  inputRef={passwordRef}
                  type="password"
                />
              </Stack>
            </Box>
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                sx={{ marginTop: 4 }}
              >
                Sign Up
              </Button>
            </Box>
          </form>

          <Typography
            variant="h6"
            component="h1"
            color="#9a9c9e"
            fontWeight="medium"
            fontSize={14}
          >
            {error?.message}
          </Typography>
        </Stack>
      </Container>
    </div>
  );
};

export default Register;

Register.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
