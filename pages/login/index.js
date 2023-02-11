import { useState, useRef } from "react";
import { useRouter } from "next/router";

import LoginLayout from "../../components/layout/LoginLayout";

import { Typography } from "@mui/material";

import styles from "./login.module.css";

const Login = () => {
  const router = useRouter();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);
    setError(null);

    try {
      // const user = await Auth.signIn(username, password);
      // const { idToken, accessToken, refreshToken } = user.signInUserSession;
      // console.log("idToken", idToken);
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
    } catch (error) {
      setError(error.message);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["login-container"]}>
        <div className={styles["header"]}>
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
        </div>
        <div className={styles["input-container"]}>
          <div className={styles["input"]}>
            <label htmlFor="username">
              <Typography
                variant="h6"
                component="h1"
                fontWeight="medium"
                fontSize={14}
                gutterBottom
              >
                E-Mail or Username
              </Typography>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              ref={usernameRef}
            />
          </div>

          <div className={styles["input"]}>
            <label htmlFor="password">
              <Typography
                variant="h6"
                component="h1"
                fontWeight="medium"
                fontSize={14}
                gutterBottom
              >
                Password
              </Typography>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>

          <div className={styles["input"]}>
            <button className="button-9" onClick={handleSubmit}>
              Login now
            </button>
          </div>
        </div>
        {/* <div className={styles["footer"]}>footer</div> */}
      </div>
    </div>
  );
};

export default Login;

Login.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
