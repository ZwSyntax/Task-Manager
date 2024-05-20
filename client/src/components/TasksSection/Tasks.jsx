import styles from "./Tasks.module.css";
import {
  filterLightLogo,
  plusLogo,
  sortLightLogo,
} from "../../assets/index.js";
import Task from "./Task.jsx";

const Tasks = () => {
  return (
    <div className={styles["tasks-container"]}>
      <div className={styles["task-header"]}>
        <p>Task Board</p>
        <div className={styles["task-header-options"]}>
          <div className={styles["create-task"]}>
            <div className={styles["create-task-logo"]}>
              <img src={plusLogo} alt={"plusLogo"} />
            </div>
            <p>Add New</p>
          </div>
          <div className={styles["filter"]}>
            <img src={filterLightLogo} alt={"filter"} />
          </div>
          <div className={styles["sort"]}>
            <img src={sortLightLogo} alt={"sort"} />
          </div>
        </div>
      </div>
      <Task />
    </div>
  );
};

export default Tasks;
