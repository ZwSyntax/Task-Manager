import Signup from "../components/Auth/Signup.jsx";
import Login from "../components/Auth/Login.jsx";
import styles from "./Auth.module.css";
import { taskMasterLogo } from "../assets/index.js";
import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authConditionHandler = (value) => {
    setIsLogin(value);
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-container-sub"]}>
        <div className={styles["logo-section"]}>
          <img src={taskMasterLogo} alt={"logo"} />
          <h2>Taskmaster</h2>
        </div>
        <div
          className={`${styles["auth-type"]} ${!isLogin ? styles["auth-signup"] : ""}`}
        >
          <div
            onClick={() => authConditionHandler(true)}
            className={styles["login"]}
          >
            <p>Login</p>
          </div>

          <div
            onClick={() => authConditionHandler(false)}
            className={styles["signup"]}
          >
            <p>Sign Up</p>
          </div>
        </div>

        {isLogin && <Login />}
        {!isLogin && <Signup />}
      </div>
      <div className={styles["auth-design"]}></div>
    </div>
  );
};
export default Auth;
