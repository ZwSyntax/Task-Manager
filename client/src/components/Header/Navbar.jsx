import styles from "./Navbar.module.css";
import {
  crosLight,
  searchLightLogo,
  taskMasterLogo,
  userLogo,
} from "../../assets/index.js";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../store/auth-action.js";
import { taskAction } from "../../store/tasks.js";

const Navbar = () => {
  const [isShowSeach, setShowSeach] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

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

  const logoutHandlers = () => {
    dispatch(logoutHandler());
  };

  const searchDataHandler = (e) => {
    setSearchData(e.target.value);
  };

  const searchHandler = () => {
    dispatch(taskAction.replaceSearchData({ data: searchData }));
  };

  useEffect(() => {
    const searchTimeOut = setTimeout(() => {
      dispatch(taskAction.replaceSearchData({ data: searchData }));
    }, 500);

    return () => {
      clearTimeout(searchTimeOut);
    };
  }, [searchData]);

  return (
    <nav className={styles["nav-container"]}>
      <div className={styles["nav-container__logo"]} onClick={goToIndex}>
        <img src={taskMasterLogo} alt={"task-master-logo"} />
        <h3>TaskMaster</h3>
      </div>

      <div className={styles["action-container"]}>
        {location.pathname === "/" ? (
          <div
            className={`${styles["search"]} ${
              isShowSeach ? styles["show-search"] : ""
            }`}
          >
            <button
              onClick={searchHandler}
              onMouseEnter={() => showSeachHandler(true)}
            >
              <img src={searchLightLogo} alt={"searchLogo"} />
            </button>
            <input
              onChange={searchDataHandler}
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
        <div
          className={styles["profile-logo"]}
          onClick={(e) => profileHandler(true, e)}
        >
          <img src={userLogo} alt={"userlogo"} />
          {isProfile && (
            <div
              className={styles["profile-options"]}
              onMouseLeave={(e) => profileHandler(false, e)}
            >
              <Link to={"/profile"}>
                <div
                  className={styles["profile"]}
                  onClick={(e) => profileHandler(false, e)}
                >
                  <p>Profile</p>
                </div>
              </Link>

              <div
                className={styles["logout"]}
                onClick={(e) => {
                  profileHandler(false, e);
                  logoutHandlers();
                }}
              >
                <p>Log out</p>
              </div>

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
