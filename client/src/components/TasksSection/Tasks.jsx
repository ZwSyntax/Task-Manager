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
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [isShortShow, setIsShortShow] = useState(false);

  const newTaskHandler = () => {
    setIsNewTask((pre) => !pre);
  };

  const filterHandler = (value, e) => {
    e.stopPropagation();
    setIsFilterShow(value);
    setIsShortShow(false);
  };

  const shorterHandler = (value, e) => {
    e.stopPropagation();
    setIsShortShow(value);
    setIsFilterShow(false);
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
          <div
            className={styles["filter"]}
            onClick={() => filterHandler(true, e)}
          >
            <img
              onClick={(e) => filterHandler(true, e)}
              src={filterLightLogo}
              alt={"filter"}
            />
            {isFilterShow && (
              <div
                className={styles["filter-options"]}
                onMouseLeave={(e) => filterHandler(false, e)}
              >
                <p onClick={(e) => filterHandler(false, e)}>Completed</p>
                <p onClick={(e) => filterHandler(false, e)}>Pending</p>
                <div
                  onClick={(e) => filterHandler(false, e)}
                  className={styles["filter-cross"]}
                >
                  <img src={crosLight} alt={"cross"} />
                </div>
              </div>
            )}
          </div>
          <div
            className={styles["sort"]}
            onClick={(e) => shorterHandler(true, e)}
          >
            <img src={sortLightLogo} alt={"sort"} />
            {isShortShow && (
              <div
                className={styles["sort-options"]}
                onMouseLeave={(e) => shorterHandler(false, e)}
              >
                <p onClick={(e) => shorterHandler(false, e)}>Date</p>
                <p onClick={(e) => shorterHandler(false, e)}>Priority</p>
                <div
                  onClick={(e) => shorterHandler(false, e)}
                  className={styles["filter-cross"]}
                >
                  <img src={crosLight} alt={"cross"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isNewTask && <NewTask />}
      <Task />
    </div>
  );
};

export default Tasks;
