import styles from "./Message.module.css";
import { crosLight } from "../../assets/index.js";

const Message = ({ message = "Message Send!", type, closeHandler }) => {
  const messagesCloseHandler = () => {
    closeHandler();
  };

  return (
    <div
      className={`${styles["message-container"]}  ${type === "error" ? styles["error"] : ""}`}
    >
      <p>{message}</p>{" "}
      <div onClick={messagesCloseHandler} className={styles["close"]}>
        <img src={crosLight} alt={"close"} />
      </div>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default Message;
