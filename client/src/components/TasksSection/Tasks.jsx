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
import { TasksFilterCard } from "../UI/FunctionCard.jsx";
import EditTask from "./EditTask.jsx";

const Tasks = () => {
  const [isNewTask, setIsNewTask] = useState(false);
  const [isEditTask, setEditTask] = useState(false);
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [isShortShow, setIsShortShow] = useState(false);

  const newTaskHandler = () => {
    if (!isEditTask) {
      setIsNewTask((pre) => !pre);
    }
    setEditTask(false);
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

  const editTaskHandler = () => {
    setEditTask(true);
    setIsNewTask(false);
  };

  return (
    <div className={styles["tasks-container"]}>
      <div className={styles["task-header"]}>
        <p>Task Board</p>
        <div className={styles["task-header-options"]}>
          <div
            onClick={newTaskHandler}
            className={`${styles["create-task"]} ${isNewTask ? styles["close-task"] : ""} ${isEditTask ? styles["close-task"] : ""}`}
          >
            <div className={styles["create-task-logo"]}>
              <img
                src={isNewTask ? crosLight : isEditTask ? crosLight : plusLogo}
                alt={"plusLogo"}
              />
            </div>
            {isNewTask && <p>Close New</p>}{" "}
            {!isEditTask && !isNewTask && <p>Add New</p>}{" "}
            {isEditTask && <p>Close Edit</p>}
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
              <TasksFilterCard
                optionHandlder={filterHandler}
                options={["Completed", "Pending"]}
              />
            )}
          </div>
          <div
            className={styles["sort"]}
            onClick={(e) => shorterHandler(true, e)}
          >
            <img src={sortLightLogo} alt={"sort"} />
            {isShortShow && (
              <TasksFilterCard
                options={["Date", "Priority"]}
                optionHandlder={shorterHandler}
              />
            )}
          </div>
        </div>
      </div>
      {isNewTask && <NewTask />}
      {isEditTask && <EditTask />}
      <Task editTaskHandler={editTaskHandler} />
    </div>
  );
};

export default Tasks;
