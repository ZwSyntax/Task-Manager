import styles from "./Task.module.css";
import {
  blueFlag,
  greenFlag,
  redFlag,
  threeDotLightLogo,
} from "../../assets/index.js";
import { useState } from "react";
import { TaskOptionConfirmCard } from "../UI/FunctionCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../../store/tasks.js";
import { uiAction } from "../../store/ui.js";

const URL = import.meta.env.VITE_SERVER_URL;

const convertTimestampToIST = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const istDate = date.toLocaleDateString("en-US", options);
  return istDate;
};

const Task = ({ editTaskHandler }) => {
  const [shownOptionTaskId, setShownOptionTaskId] = useState(null);
  const [confirmType, setConfirmType] = useState(null);
  const taskList = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();

  const optionShowHandler = (e, taskId) => {
    e.stopPropagation();
    setShownOptionTaskId(taskId);
    setConfirmType(null);
  };

  const onDeleteClicked = (e, taskId) => {
    e.stopPropagation();
    setConfirmType({ type: "delete", taskId });
  };

  const onCompleteClicked = (e, taskId) => {
    e.stopPropagation();
    setConfirmType({ type: "complete", taskId });
  };

  const confirmOptionCloseHandler = (e) => {
    e.stopPropagation();
    setConfirmType(null);
  };

  const deleteOnConfirmHandler = (e, taskId) => {
    e.stopPropagation();
    setConfirmType(null);

    const url = URL + "task";

    fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("task delete issue");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(taskAction.replaceTask({ tasks: data.data }));
        dispatch(uiAction.messageHandler({ message: "Delete Done!" }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
      });
  };

  const completeOnConfirmHandler = (e, taskId) => {
    e.stopPropagation();
    setConfirmType(null);
    const url = URL + "task";

    fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("task delete issue");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(taskAction.replaceTask({ tasks: data.data }));
        dispatch(uiAction.messageHandler({ message: "Complete Done!" }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
      });
  };

  return (
    <div className={styles["task-container"]}>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>
              <img
                src={threeDotLightLogo}
                className={styles["three-dot-header"]}
                alt={"three dot"}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr key={task._id}>
              <td>{task.task}</td>
              <td>{convertTimestampToIST(task.createDate)}</td>
              <td>
                <div className={styles["progress-section"]}>
                  <div
                    className={`${task.status === "Pending" ? styles["orange-dot"] : styles["dot"]}`}
                  ></div>
                  <p>{task.status}</p>
                </div>
              </td>
              <td>
                <div className={styles["priority-flag"]}>
                  {task.priority === 1 && (
                    <img src={blueFlag} alt={"blue flag"} />
                  )}
                  {task.priority === 2 && (
                    <img src={greenFlag} alt={"green flag"} />
                  )}
                  {task.priority === 3 && (
                    <img src={redFlag} alt={"red flag"} />
                  )}
                </div>
              </td>
              <td>
                <div
                  className={styles["three-dot-option-section"]}
                  onClick={(e) => optionShowHandler(e, task._id)}
                >
                  <img
                    className={styles["three-dot-option-img"]}
                    src={threeDotLightLogo}
                    alt={"threeDotLight"}
                  />
                  {shownOptionTaskId === task._id && (
                    <div
                      className={styles["three-dot-option"]}
                      onMouseLeave={(e) => optionShowHandler(e, null)}
                    >
                      <p
                        onClick={(e) => {
                          optionShowHandler(e, null);
                          editTaskHandler(task._id);
                        }}
                      >
                        Edit
                      </p>
                      <p
                        onClick={(e) => {
                          optionShowHandler(e, null);
                          onDeleteClicked(e, task._id);
                        }}
                      >
                        Delete
                      </p>
                      <p
                        onClick={(e) => {
                          optionShowHandler(e, null);
                          onCompleteClicked(e, task._id);
                        }}
                      >
                        Mark Complete
                      </p>
                    </div>
                  )}
                  {confirmType && confirmType.taskId === task._id && (
                    <TaskOptionConfirmCard
                      closeHander={confirmOptionCloseHandler}
                      optionHandeler={
                        confirmType.type === "delete"
                          ? (e) => deleteOnConfirmHandler(e, task._id)
                          : (e) => completeOnConfirmHandler(e, task._id)
                      }
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {taskList.length === 0 && (
        <div
          style={{ width: "100%", margin: "20px auto", textAlign: "center" }}
        >
          <p>No Tasks</p>
        </div>
      )}
    </div>
  );
};

export default Task;
