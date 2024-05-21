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

  const [inputValidity, setInputValidity] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
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
        name === "password" || name === "confirmPassword"
          ? value.trim().length >= 6
          : value.trim() !== "",
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const nameIsValid = userData.name.trim() !== "";
    const emailIsValid = userData.email.trim() !== "";
    const passwordIsValid = userData.password.trim().length >= 6;
    const confirmPasswordIsValid = userData.confirmPassword.trim().length >= 6;
    const passwordsMatch = userData.password === userData.confirmPassword;

    setInputValidity({
      name: nameIsValid,
      email: emailIsValid,
      password: passwordIsValid,
      confirmPassword: confirmPasswordIsValid && passwordsMatch,
    });

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid ||
      !passwordsMatch
    ) {
      return;
    }

    dispatch(signupHandler(userData));
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={styles["auth-container-sub"]}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name here..."
          onChange={userDataHandler}
          value={userData.name}
          className={inputValidity.name ? "" : styles.invalid}
        />
        {!inputValidity.name && (
          <p className={styles.errorText}>Please enter your name.</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Your email here..."
          name="email"
          onChange={userDataHandler}
          value={userData.email}
          className={inputValidity.email ? "" : styles.invalid}
        />
        {!inputValidity.email && (
          <p className={styles.errorText}>Please enter a valid email.</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Your password ..."
          name="password"
          onChange={userDataHandler}
          value={userData.password}
          className={inputValidity.password ? "" : styles.invalid}
        />
        {!inputValidity.password && (
          <p className={styles.errorText}>
            Password must be at least 6 characters long.
          </p>
        )}

        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          placeholder="Your password Again ..."
          name="confirmPassword"
          onChange={userDataHandler}
          value={userData.confirmPassword}
          className={inputValidity.confirmPassword ? "" : styles.invalid}
        />
        {!inputValidity.confirmPassword && (
          <p className={styles.errorText}>
            Passwords must match and be at least 6 characters long.
          </p>
        )}

        <button type="submit">
          {isAuthLoader ? "Loading...." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
