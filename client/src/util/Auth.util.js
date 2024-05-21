import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const checkLogin = () => {
  const isLogin = Cookies.get("isLogin");

  if (isLogin === "true") {
    return redirect("/");
  }
  return 0;
};

export const checkLoginProfile = () => {
  const isLogin = Cookies.get("isLogin");
  if (isLogin !== "true") {
    return redirect("/login");
  }

  return 0;
};
