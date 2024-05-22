import { redirect } from "react-router-dom";

export const checkLogin = () => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin === "true") {
    return redirect("/");
  }
  return null;
};

export const checkLoginProfile = () => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin !== "true") {
    return redirect("/login");
  }
  return null;
};
