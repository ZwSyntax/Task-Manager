import styles from "./Navbar.module.css";
import {
  searchLightLogo,
  sunLogo,
  taskMasterLogo,
  userLogo,
} from "../../assets/index.js";
import { useState } from "react";

const Navbar = () => {
  const [isShowSeach, setShowSeach] = useState(false);

  const showSeachHandler = (value) => {
    setShowSeach(value);
  };

  return (
    <nav className={styles["nav-container"]}>
      <div className={styles["nav-container__logo"]}>
        <img src={taskMasterLogo} alt={"task-master-logo"} />
        <h3>TaskMaster</h3>
      </div>
      <div className={styles["action-container"]}>
        <div
          className={`${styles["search"]} ${isShowSeach ? styles["show-search"] : ""}`}
        >
          <button onMouseEnter={() => showSeachHandler(true)}>
            <img src={searchLightLogo} alt={"searchLogo"} />
          </button>
          <input
            autoComplete={"off"}
            type="text"
            name="search"
            placeholder="Search"
            onMouseEnter={() => showSeachHandler(true)}
            onMouseLeave={() => showSeachHandler(false)}
          />
        </div>
        <div className={styles["theme-mode"]}>
          <img src={sunLogo} alt={"sunLogo"} />
        </div>
        <div className={styles["profile-logo"]}>
          <img src={userLogo} alt={"userlogo"} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
