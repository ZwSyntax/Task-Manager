import { authAction } from "./auth.js";
import { uiAction } from "./ui.js";

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
      .then((response) => {
        if (!response.ok) {
          const err = new Error("something went wrong");
          err.statusCode = response.status;
          throw err;
        }
        return response.json();
      })
      .then(() => {
        dispatch(uiAction.messageHandler({ message: "Sign Up Successfully!" }));
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          dispatch(uiAction.errorMessageHandler({ message: "User Exist" }));
        } else if (err.statusCode === 401) {
          dispatch(
            uiAction.errorMessageHandler({ message: "Password Not Match" })
          );
        } else {
          dispatch(
            uiAction.errorMessageHandler({ message: "Something went wrong!" })
          );
        }
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
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(authAction.loginHandler());
        localStorage.setItem("isLogin", "true");
      })
      .catch((error) => {
        dispatch(
          uiAction.errorMessageHandler({ message: "Invalid Credential!" })
        );
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
        localStorage.removeItem("isLogin");
        localStorage.removeItem("active-profile");
        window.open("/login", "_self");
      });
  };
};
