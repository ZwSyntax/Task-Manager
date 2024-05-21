import styles from "./UserProfileSection.module.css";
import Sidebar from "./Sidebar.jsx";
import ProfileEdit from "./ProfileEdit.jsx";
import ProfileSecurity from "./ProfileSecurity.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui.js";
import Message from "../UI/Message..jsx";

const UserProfileSection = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("active-profile") || "profile",
  );
  const isMessage = useSelector((state) => state.ui.isMessage);
  const message = useSelector((state) => state.ui.message);
  const messageType = useSelector((state) => state.ui.messageType);
  const disptch = useDispatch();

  const activeSectionHandler = (value) => {
    setActiveSection(value);
  };

  const closeMessage = () => {
    disptch(uiAction.closeMessageHandler());
  };

  useEffect(() => {
    const messageHideHandler = setTimeout(() => {
      disptch(uiAction.closeMessageHandler());
    }, 5000);

    return () => {
      clearTimeout(messageHideHandler);
    };
  }, [isMessage, message]);

  return (
    <div className={styles["user-profile-container"]}>
      {isMessage && (
        <Message
          message={message}
          type={messageType}
          closeHandler={closeMessage}
        />
      )}
      <Sidebar activeSectionHandler={activeSectionHandler} />
      {activeSection === "profile" && <ProfileEdit />}
      {activeSection === "security" && <ProfileSecurity />}
    </div>
  );
};

export default UserProfileSection;
