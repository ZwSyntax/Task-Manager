import Signup from "../components/Auth/Signup.jsx";
import Login from "../components/Auth/Login.jsx";
import styles from "./Auth.module.css";
import { taskMasterLogo } from "../assets/index.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/UI/Message..jsx";
import { uiAction } from "../store/ui.js";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isLoginAuth = useSelector((state) => state.auth.isLogin);
  const isMessage = useSelector((state) => state.ui.isMessage);
  const message = useSelector((state) => state.ui.message);
  const messageType = useSelector((state) => state.ui.messageType);
  const disptch = useDispatch();

  useEffect(() => {
    if (isLoginAuth) {
      window.open("/", "_self");
    }
  }, [isLoginAuth]);

  const authConditionHandler = (value) => {
    setIsLogin(value);
  };

  const closeMessage = () => {
    disptch(uiAction.closeMessageHandler());
  };

  useEffect(() => {
    const messageHideHandler = setTimeout(() => {
      disptch(uiAction.closeMessageHandler());
    }, 5000);

    return () => {
      clearTimeout(messageHideHandler);
    };
  }, [isMessage, message]);

  return (
    <div className={styles["auth-container"]}>
      {isMessage && (
        <Message
          message={message}
          type={messageType}
          closeHandler={closeMessage}
        />
      )}

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
