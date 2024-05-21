import styles from "./Task.module.css";
import { redFlag, threeDotLightLogo } from "../../assets/index.js";
import { useState } from "react";
import { TaskOptionConfirmCard } from "../UI/FunctionCard.jsx";

const Task = ({ editTaskHandler }) => {
  const [isOptionShown, setIsOptionShown] = useState(false);
  const [isDeleteConfirmShow, setIsDeleteConfirmShow] = useState(false);
  const [isCompleteConfirmShow, setIsCompleteConfirmShow] = useState(false);

  const optionShowHandler = (e, value) => {
    e.stopPropagation();
    setIsOptionShown(value);
    setIsDeleteConfirmShow(false);
    setIsCompleteConfirmShow(false);
  };

  const onDeleteClicked = (e) => {
    e.stopPropagation();
    setIsDeleteConfirmShow(true);
    setIsCompleteConfirmShow(false);
  };

  const onCompleteClicked = (e) => {
    e.stopPropagation();
    setIsDeleteConfirmShow(false);
    setIsCompleteConfirmShow(true);
  };

  const confirmOptionCloseHandler = (e) => {
    e.stopPropagation();
    setIsDeleteConfirmShow(false);
    setIsCompleteConfirmShow(false);
  };

  const deleteOnConfirmHandler = (e) => {
    e.stopPropagation();
    console.log("delete");
    setIsDeleteConfirmShow(false);
    setIsCompleteConfirmShow(false);
  };

  const completeOnConfirmHandler = (e) => {
    e.stopPropagation();
    console.log("confirm");
    setIsDeleteConfirmShow(false);
    setIsCompleteConfirmShow(false);
  };

  return (
    <div className={styles["task-container"]}>
      <table>
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

        <tr>
          <td>Design Wireframe</td>
          <td>Sep 04, 2018</td>
          <td>
            <div className={styles["progress-section"]}>
              <div className={styles["dot"]}></div>
              <p>In Progress</p>
            </div>
          </td>
          <td>
            <div className={styles["priority-flag"]}>
              <img src={redFlag} alt={"red flag"} />
            </div>
          </td>
          <td>
            <div className={styles["three-dot-option-section"]}>
              <img
                className={styles["three-dot-option-img"]}
                src={threeDotLightLogo}
                alt={"threeDotLight"}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Design Wireframe</td>
          <td>Sep 04, 2018</td>
          <td>
            <div className={styles["progress-section"]}>
              <div className={styles["dot"]}></div>
              <p>In Progress</p>
            </div>
          </td>
          <td>
            <div className={styles["priority-flag"]}>
              <img src={redFlag} alt={"red flag"} />
            </div>
          </td>
          <td>
            <div
              className={styles["three-dot-option-section"]}
              onClick={(e) => optionShowHandler(e, true)}
            >
              <img
                className={styles["three-dot-option-img"]}
                src={threeDotLightLogo}
                alt={"threeDotLight"}
              />
              {isOptionShown && (
                <div
                  className={styles["three-dot-option"]}
                  onMouseLeave={(e) => optionShowHandler(e, false)}
                >
                  <p
                    onClick={(e) => {
                      optionShowHandler(e, false);
                      editTaskHandler();
                    }}
                  >
                    Edit
                  </p>
                  <p
                    onClick={(e) => {
                      optionShowHandler(e, false);
                      onDeleteClicked(e);
                    }}
                  >
                    Delete
                  </p>
                  <p
                    onClick={(e) => {
                      optionShowHandler(e, false), onCompleteClicked(e);
                    }}
                  >
                    Marked Complete
                  </p>
                </div>
              )}
              {isDeleteConfirmShow && (
                <TaskOptionConfirmCard
                  closeHander={confirmOptionCloseHandler}
                  optionHandeler={deleteOnConfirmHandler}
                />
              )}
              {isCompleteConfirmShow && (
                <TaskOptionConfirmCard
                  closeHander={confirmOptionCloseHandler}
                  optionHandeler={completeOnConfirmHandler}
                />
              )}
            </div>
          </td>
        </tr>
        <tr>
          <td>Design Wireframe</td>
          <td>Sep 04, 2018</td>
          <td>
            <div className={styles["progress-section"]}>
              <div className={styles["dot"]}></div>
              <p>In Progress</p>
            </div>
          </td>
          <td>
            <div className={styles["priority-flag"]}>
              <img src={redFlag} alt={"red flag"} />
            </div>
          </td>
          <td>
            <div className={styles["three-dot-option-section"]}>
              <img
                className={styles["three-dot-option-img"]}
                src={threeDotLightLogo}
                alt={"threeDotLight"}
              />
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Task;
