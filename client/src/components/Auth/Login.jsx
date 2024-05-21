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

  const [inputValidity, setInputValidity] = useState({
    email: true,
    password: true,
  });

  const userDataHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setInputValidity((prevState) => ({
      ...prevState,
      [name]:
        name === "password" ? value.trim().length >= 6 : value.trim() !== "",
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const emailIsValid = userData.email.trim() !== "";
    const passwordIsValid = userData.password.trim().length >= 6;

    setInputValidity({
      email: emailIsValid,
      password: passwordIsValid,
    });

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    dispatch(loginHandler(userData));
  };

  return (
    <div className={styles["auth-container-sub"]}>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          onChange={userDataHandler}
          value={userData.email}
          type="text"
          id="email"
          name="email"
          placeholder="Your email here..."
          className={inputValidity.email ? "" : styles.invalid}
        />
        {!inputValidity.email && (
          <p className={styles.errorText}>Please enter a valid email.</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={userDataHandler}
          placeholder="Your password ..."
          name="password"
          value={userData.password}
          className={inputValidity.password ? "" : styles.invalid}
        />
        {!inputValidity.password && (
          <p className={styles.errorText}>
            Password must be at least 6 characters long.
          </p>
        )}

        <button type="submit">{isAuthLoader ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
