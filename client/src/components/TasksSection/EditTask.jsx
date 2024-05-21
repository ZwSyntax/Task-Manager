import styles from "./NewTask.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

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

  return (
    <div className={styles["new-task-container"]}>
      <div className={styles["new-task-container-sub"]}>
        <form>
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
