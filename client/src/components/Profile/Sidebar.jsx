import styles from "./Sidebar.module.css";
import { profileLightLogo, securityLightLogo } from "../../assets/index.js";
import { useState } from "react";

const Sidebar = ({ activeSectionHandler }) => {
  const [isActiveProfile, setActiveProfile] = useState(
    localStorage.getItem("active-profile") || "profile",
  );

  const activeProfileHandler = (value) => {
    setActiveProfile(value);
    localStorage.setItem("active-profile", value);
    activeSectionHandler(value);
  };

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["profile-side-bar"]}>
        <div className={styles["name"]}>
          <p>User Name</p>
        </div>
        <div
          className={`${styles["sidebar-profile"]} ${isActiveProfile === "profile" ? styles["active-profile"] : ""}`}
          onClick={() => {
            activeProfileHandler("profile");
          }}
        >
          <img src={profileLightLogo} alt={"profilelogo"} />
          <p>Profile</p>
        </div>
        <div
          className={`${styles["sidebar-security"]} ${isActiveProfile === "security" ? styles["active-profile"] : ""}`}
          onClick={() => {
            activeProfileHandler("security");
          }}
        >
          <img src={securityLightLogo} alt={"securitylogo"} />
          <p>Security</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
