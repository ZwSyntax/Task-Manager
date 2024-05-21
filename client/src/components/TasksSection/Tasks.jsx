import styles from "./Tasks.module.css";
import {
  crosLight,
  filterLightLogo,
  plusLogo,
  sortLightLogo,
} from "../../assets/index.js";
import Task from "./Task.jsx";
import NewTask from "./NewTask.jsx";
import { useEffect, useState } from "react";
import { TasksFilterCard } from "../UI/FunctionCard.jsx";
import EditTask from "./EditTask.jsx";
import { taskAction } from "../../store/tasks.js";
import { useDispatch } from "react-redux";

const URL = import.meta.env.VITE_SERVER_URL;

const Tasks = () => {
  const dispatch = useDispatch();
  const [isNewTask, setIsNewTask] = useState(false);
  const [isEditTask, setEditTask] = useState(false);
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [isShortShow, setIsShortShow] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const [filterBy, setFilterBy] = useState("All");

  const newTaskHandler = () => {
    if (!isEditTask) {
      setIsNewTask((pre) => !pre);
    }
    setEditTask(false);
  };

  const filterHandler = (value, e, data) => {
    e.stopPropagation();
    setIsFilterShow(value);
    setIsShortShow(false);
    setFilterBy(data);
  };

  const shorterHandler = (value, e, data) => {
    e.stopPropagation();
    setIsShortShow(value);
    setIsFilterShow(false);
    setSortBy(data);
  };

  const editTaskHandler = () => {
    setEditTask(true);
    setIsNewTask(false);
  };

  const getTasks = () => {
    console.log(sortBy, filterBy);

    if (sortBy && filterBy) {
      const url =
        URL +
        `task?sorts=${sortBy === "Default" ? "" : sortBy}&filter=${filterBy === "All" ? "" : filterBy}`;

      console.log(url);

      fetch(url, { method: "GET", credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("task get issue");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(taskAction.replaceTask({ tasks: data.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getTasks();
  }, [filterBy, sortBy]);

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
            onClick={(e) => filterHandler(true, e)}
          >
            <img
              onClick={(e) => filterHandler(true, e)}
              src={filterLightLogo}
              alt={"filter"}
            />
            {isFilterShow && (
              <TasksFilterCard
                optionHandlder={filterHandler}
                options={["All", "Completed", "Pending"]}
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
                options={["Default", "Date", "Priority"]}
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
