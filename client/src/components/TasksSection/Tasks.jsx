import styles from "./Tasks.module.css";
import {
  crosLight,
  filterLightLogo,
  plusLogo,
  sortLightLogo,
} from "../../assets/index.js";
import Task from "./Task.jsx";
import NewTask from "./NewTask.jsx";
import { useState } from "react";

const Tasks = () => {
  const [isNewTask, setIsNewTask] = useState(true);

  const newTaskHandler = (value) => {
    setIsNewTask((pre) => !pre);
  };

  return (
    <div className={styles["tasks-container"]}>
      <div className={styles["task-header"]}>
        <p>Task Board</p>
        <div className={styles["task-header-options"]}>
          <div
            onClick={newTaskHandler}
            className={`${styles["create-task"]} ${isNewTask ? styles["close-task"] : ""}`}
          >
            <div className={styles["create-task-logo"]}>
              <img src={isNewTask ? crosLight : plusLogo} alt={"plusLogo"} />
            </div>
            {isNewTask ? <p>Close New</p> : <p>Add New</p>}
          </div>
          <div className={styles["filter"]}>
            <img src={filterLightLogo} alt={"filter"} />
          </div>
          <div className={styles["sort"]}>
            <img src={sortLightLogo} alt={"sort"} />
          </div>
        </div>
      </div>
      {isNewTask && <NewTask />}
      <Task />
    </div>
  );
};

export default Tasks;
