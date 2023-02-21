import { fetchUser } from "../../store/user/thunks";

import cookie from "cookie";

import store from "../../store";

import { useRouter } from "next/router";

import { useEffect } from "react";

export const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isAuthenticated = props.isAuthenticated;
    const isLoading = props.isLoading;

    useEffect(() => {
      if (!isLoading && !isAuthenticated && router.pathname !== "/login") {
        console.log("not authenticated, redirecting to login page");
        router.push("/login");
      }
    }, [isLoading, isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (context) => {
    const { req } = context;
    const cookies = cookie.parse(req ? req.headers.cookie || "" : "");
    const isAuthenticated = !!cookies.access_token;
    const isLoading = !store.getState().user.username;

    if (isAuthenticated && isLoading) {
      await store.dispatch(fetchUser());
      console.log("fetching user");
    }

    return {
      isAuthenticated,
      isLoading,
      user: store.getState().user,
      cookies,
    };
  };

  return Wrapper;
};
