import Navbar from "../components/Header/Navbar.jsx";
import Tasks from "../components/TasksSection/Tasks.jsx";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles["home-container"]}>
      <Navbar />
      <Tasks />
    </div>
  );
};

export default Home;
