import styles from "./Task.module.css";
import { redFlag, threeDotLightLogo } from "../../assets/index.js";

const Task = () => {
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
                className={styles["three-dot-options"]}
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
            <div className={styles["three-dot-option-section"]}>
              <img
                className={styles["three-dot-options"]}
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
            <div className={styles["three-dot-option-section"]}>
              <img
                className={styles["three-dot-options"]}
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
