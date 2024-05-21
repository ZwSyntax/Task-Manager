import styles from "./Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginHandler } from "../../store/auth-action.js";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthLoader = useSelector((state) => state.auth.isAuthLoader);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const userDataHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginHandler(userData));
  };

  return (
    <div className={styles["auth-container-sub"]}>
      <form onSubmit={submitHandler}>
        <label htmlFor={"email"}>Email</label>
        <input
          onChange={userDataHandler}
          value={userData.email}
          type={"text"}
          id={"email"}
          name={"email"}
          placeholder={"Your email here..."}
        />
        <label htmlFor={"password"}>Password</label>
        <input
          type={"password"}
          id={"password"}
          onChange={userDataHandler}
          placeholder={"Your password ..."}
          name={"password"}
          value={userData.password}
        />
        <button type="submit">{isAuthLoader ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
