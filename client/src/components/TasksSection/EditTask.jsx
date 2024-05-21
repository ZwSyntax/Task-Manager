import styles from "./NewTask.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { taskAction } from "../../store/tasks.js";

const URL = import.meta.env.VITE_SERVER_URL;

const EditTask = ({ singleTask }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    task: "",
    priority: "",
  });
  const [isLoader, setIsLoder] = useState(false);

  const taskDataHandler = (e) => {
    const { name, value } = e.target;

    setTaskData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    setTaskData((prevState) => {
      return { ...prevState, task: "", priority: "" };
    });
  }, [singleTask]);

  const onDataSubmit = (e) => {
    e.preventDefault();
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
        task: taskData.task || singleTask.task,
        priority: taskData.priority || singleTask.priority,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("task added issue");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        setTaskData((prevState) => {
          return {
            ...prevState,
            task: data.singleTask.task,
            priority: data.singleTask.priority,
          };
        });
        dispatch(taskAction.replaceTask({ tasks: data.data }));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoder(false);
      });
  };

  console.log(taskData);

  return (
    <div className={styles["new-task-container"]}>
      <div className={styles["new-task-container-sub"]}>
        <form onSubmit={onDataSubmit}>
          <label htmlFor={"newtask"}>Edit Task</label>
          <input
            onChange={taskDataHandler}
            type={"text"}
            id={"newtask"}
            placeholder={"Add New Task"}
            name={"task"}
            value={taskData.task || singleTask?.task}
          />
          <label htmlFor={"pri"}>Priority</label>
          <select
            onChange={taskDataHandler}
            value={taskData.priority || singleTask.priority}
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
