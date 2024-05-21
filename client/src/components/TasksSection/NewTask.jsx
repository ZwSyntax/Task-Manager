import styles from "./NewTask.module.css";
import { useState } from "react";
import { taskAction } from "../../store/tasks.js";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui.js";

const URL = import.meta.env.VITE_SERVER_URL;

const NewTask = () => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    task: "",
    priority: "",
  });
  const [isLoader, setIsLoder] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const taskDataHandler = (e) => {
    const { name, value } = e.target;

    setTaskData((prevState) => {
      return { ...prevState, [name]: value };
    });

    if (name === "task") {
      if (value.length >= 4) {
        setIsValid(true);
        setErrorMessage("");
      } else {
        setIsValid(false);
        setErrorMessage("Task must be at least 4 characters long.");
      }
    }
  };

  const onDataSubmit = (e) => {
    e.preventDefault();

    if (taskData.task.length < 4) {
      setIsValid(false);
      setErrorMessage("Task must be at least 4 characters long.");
      return;
    }

    const url = URL + "task";

    setIsLoder(true);
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("task added issue");
        }

        return response.json();
      })
      .then((data) => {
        dispatch(taskAction.addNewTask({ task: data.data }));
        dispatch(uiAction.messageHandler({ message: "New Task Added!" }));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
      })
      .finally(() => {
        setIsLoder(false);
        setTaskData({ task: "", priority: "" });
        setIsValid(true);
        setErrorMessage("");
      });
  };

  return (
    <div className={styles["new-task-container"]}>
      <div className={styles["new-task-container-sub"]}>
        <form onSubmit={onDataSubmit}>
          <label htmlFor={"newtask"}>New Task</label>
          <input
            onChange={taskDataHandler}
            type={"text"}
            id={"newtask"}
            placeholder={"Add New Task"}
            name={"task"}
            value={taskData.task}
            className={!isValid ? styles.invalid : ""}
          />
          {!isValid && (
            <p className={styles["error-message"]}>{errorMessage}</p>
          )}
          <label htmlFor={"pri"}>Priority</label>
          <select
            id={"pri"}
            name={"priority"}
            value={taskData.priority}
            onChange={taskDataHandler}
          >
            <option>Select Priority</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
          <button type="submit">
            {isLoader ? "Loading...." : "Add New Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
