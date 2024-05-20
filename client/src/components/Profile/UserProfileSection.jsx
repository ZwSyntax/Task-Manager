import styles from "./UserProfileSection.module.css";
import Sidebar from "./Sidebar.jsx";
import ProfileEdit from "./ProfileEdit.jsx";
import ProfileSecurity from "./ProfileSecurity.jsx";
import { useState } from "react";

const UserProfileSection = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("active-profile") || "profile",
  );

  const activeSectionHandler = (value) => {
    setActiveSection(value);
  };

  return (
    <div className={styles["user-profile-container"]}>
      <Sidebar activeSectionHandler={activeSectionHandler} />
      {activeSection === "profile" && <ProfileEdit />}
      {activeSection === "security" && <ProfileSecurity />}
    </div>
  );
};

export default UserProfileSection;
