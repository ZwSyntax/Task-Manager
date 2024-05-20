import styles from "./Profile.module.css";
import Navbar from "../components/Header/Navbar.jsx";
import UserProfileSection from "../components/Profile/UserProfileSection.jsx";

const Profile = () => {
  return (
    <div className={styles["profile-container"]}>
      <Navbar />
      <UserProfileSection />
    </div>
  );
};

export default Profile;
