import styles from "./Navbar.module.css";
import {
  crosLight,
  searchLightLogo,
  sunLogo,
  taskMasterLogo,
  userLogo,
} from "../../assets/index.js";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isShowSeach, setShowSeach] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const location = useLocation();

  const showSeachHandler = (value) => {
    setShowSeach(value);
  };

  const profileHandler = (value, e) => {
    e.stopPropagation();
    setIsProfile(value);
    console.log(value);
  };

  const goToIndex = () => {
    window.open("/", "_self");
  };

  return (
    <nav className={styles["nav-container"]}>
      <div className={styles["nav-container__logo"]} onClick={goToIndex}>
        <img src={taskMasterLogo} alt={"task-master-logo"} />
        <h3>TaskMaster</h3>
      </div>

      <div className={styles["action-container"]}>
        {location.pathname === "/" ? (
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
        ) : (
          ""
        )}

        <div className={styles["theme-mode"]}>
          <img src={sunLogo} alt={"sunLogo"} />
        </div>
        <div
          className={styles["profile-logo"]}
          onClick={(e) => profileHandler(true, e)}
        >
          <img src={userLogo} alt={"userlogo"} />
          {isProfile && (
            <div className={styles["profile-options"]}>
              <Link to={"/profile"}>
                <div
                  className={styles["profile"]}
                  onClick={(e) => profileHandler(false, e)}
                >
                  <p>Profile</p>
                </div>
              </Link>
              <Link to={"/logout"}>
                <div
                  className={styles["logout"]}
                  onClick={(e) => profileHandler(false, e)}
                >
                  <p>Log out</p>
                </div>
              </Link>
              <div
                className={styles["cross"]}
                onClick={(e) => profileHandler(false, e)}
              >
                <img src={crosLight} alt={"cross"} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
