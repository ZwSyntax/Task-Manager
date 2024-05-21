import styles from "./NewTask.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { taskAction } from "../../store/tasks.js";
import { uiAction } from "../../store/ui.js";

const URL = import.meta.env.VITE_SERVER_URL;

const EditTask = ({ singleTask }) => {
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

  useEffect(() => {
    setTaskData({
      task: singleTask.task,
      priority: singleTask.priority,
    });
  }, [singleTask]);

  const onDataSubmit = (e) => {
    e.preventDefault();

    if (taskData.task.length < 4) {
      setIsValid(false);
      setErrorMessage("Task must be at least 4 characters long.");
      return;
    }

    const url = URL + "edittask";
    setIsLoder(true);
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: singleTask._id,
        task: taskData.task,
        priority: taskData.priority,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Task update issue");
        }
        return response.json();
      })
      .then((data) => {
        setTaskData({
          task: data.singleTask.task,
          priority: data.singleTask.priority,
        });
        dispatch(taskAction.replaceTask({ tasks: data.data }));
        dispatch(uiAction.messageHandler({ message: "Edit Done!" }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
      })
      .finally(() => {
        setIsLoder(false);
      });
  };

  return (
    <div className={styles["new-task-container"]}>
      <div className={styles["new-task-container-sub"]}>
        <form onSubmit={onDataSubmit}>
          <label htmlFor={"newtask"}>Edit Task</label>
          <input
            onChange={taskDataHandler}
            type={"text"}
            id={"newtask"}
            placeholder={"Edit Task"}
            name={"task"}
            value={taskData.task}
            className={!isValid ? styles.invalid : ""}
          />
          {!isValid && (
            <p className={styles["error-message"]}>{errorMessage}</p>
          )}
          <label htmlFor={"pri"}>Priority</label>
          <select
            onChange={taskDataHandler}
            value={taskData.priority}
            id={"pri"}
            name={"priority"}
          >
            <option value={""}>Select Priority</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
          <button type="submit">
            {isLoader ? "Loading...." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
