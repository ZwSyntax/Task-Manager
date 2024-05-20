import styles from "./Task.module.css";
import { redFlag, threeDotLightLogo } from "../../assets/index.js";
import { useState } from "react";

const Task = () => {
  const [isOptionShown, setIsOptionShown] = useState(false);

  const optionShowHandler = (e, value) => {
    e.stopPropagation();
    setIsOptionShown(value);
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
                  <p onClick={(e) => optionShowHandler(e, false)}>Edit</p>
                  <p onClick={(e) => optionShowHandler(e, false)}>Delete</p>
                  <p onClick={(e) => optionShowHandler(e, false)}>
                    Marked Complete
                  </p>
                </div>
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
