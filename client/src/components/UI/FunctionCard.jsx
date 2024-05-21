import styles from "./FunctionCard.module.css";
import { correctLight, crosLight } from "../../assets/index.js";

export const TasksFilterCard = ({ optionHandlder, options = [] }) => {
  return (
    <div
      className={styles["filter-options"]}
      onMouseLeave={(e) => optionHandlder(false, e)}
    >
      {options.map((option, index) => (
        <p key={index} onClick={(e) => optionHandlder(false, e, option)}>
          {option}
        </p>
      ))}
      <div
        onClick={(e) => optionHandlder(false, e)}
        className={styles["filter-cross"]}
      >
        <img src={crosLight} alt={"cross"} />
      </div>
    </div>
  );
};

export const TaskOptionConfirmCard = ({ optionHandeler, closeHander }) => {
  return (
    <div
      className={styles["confirm-card-main"]}
      onMouseLeave={(e) => closeHander(e)}
    >
      <p>Are you sure?</p>
      <div className={styles["options"]}>
        <div
          className={styles["option-correct"]}
          onClick={(e) => optionHandeler(e)}
        >
          <img src={correctLight} alt={"correctimg"} />
        </div>
        <div className={styles["option-cross"]} onClick={(e) => closeHander(e)}>
          <img src={crosLight} alt={"cross"} />
        </div>
      </div>
    </div>
  );
};
