import { authAction } from "./auth.js";
import Cookies from "js-cookie";

const URL = import.meta.env.VITE_SERVER_URL;

export const signupHandler = (userData) => {
  return (dispatch) => {
    const url = URL + "auth/signup";
    dispatch(authAction.authLoaderHandler());

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(authAction.authLoaderHandler());
      });
  };
};

export const loginHandler = (userData) => {
  return (dispatch) => {
    const url = URL + "auth/login";
    dispatch(authAction.authLoaderHandler());
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid login");
        }
        dispatch(authAction.loginHandler());
        return response.json();
      })
      .then((data) => {
        const userToken = Cookies.get("user_token");
        const isLogin = Cookies.get("isLogin");
        console.log(data, userToken, isLogin);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(authAction.authLoaderHandler());
      });
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    const url = URL + "auth/logout";

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(authAction.logoutHandler());
      });
  };
};
