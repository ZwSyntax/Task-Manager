import styles from "./Auth.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupHandler } from "../../store/auth-action.js";

const Signup = () => {
  const dispatch = useDispatch();
  const isAuthLoader = useSelector((state) => state.auth.isAuthLoader);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userDataHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signupHandler(userData));
    setUserData((prevState) => {
      return {
        ...prevState,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    });
  };

  return (
    <div className={styles["auth-container-sub"]}>
      <form onSubmit={submitHandler}>
        <label htmlFor={"name"}>Name</label>
        <input
          type={"text"}
          name={"name"}
          id={"name"}
          placeholder={"Your name here..."}
          onChange={userDataHandler}
          value={userData.name}
        />
        <label htmlFor={"email"}>Email</label>
        <input
          type={"text"}
          id={"email"}
          placeholder={"Your email here..."}
          name={"email"}
          onChange={userDataHandler}
          value={userData.email}
        />
        <label htmlFor={"password"}>Password</label>
        <input
          type={"password"}
          id={"password"}
          placeholder={"Your password ..."}
          name={"password"}
          onChange={userDataHandler}
          value={userData.password}
        />
        <label htmlFor={"confirm_password"}>Confirm Password</label>
        <input
          type={"text"}
          id={"confirm_password"}
          placeholder={"Your password Again ..."}
          name={"confirmPassword"}
          onChange={userDataHandler}
          value={userData.confirmPassword}
        />
        <button type="submit">
          {isAuthLoader ? "Loading...." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
