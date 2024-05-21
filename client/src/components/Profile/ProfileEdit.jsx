import styles from "./ProfileEdit.module.css";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_SERVER_URL;
const ProfileEdit = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [isLoader, setIsLoder] = useState(false);

  const userDataHandler = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    const url = URL + "user";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("profile get issue");
        }
        return response.json();
      })
      .then((data) => {
        setUserData((prevState) => {
          return {
            ...prevState,
            name: data.data.name,
            email: data.data.email,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const url = URL + "user";
    setIsLoder(true);
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("user edit issue");
        }
        return response.json();
      })
      .then((data) => {
        setUserData((prevState) => {
          return {
            ...prevState,
            name: data.data.name,
            email: data.data.email,
          };
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoder(false);
      });
  };

  return (
    <div className={styles["profile-edit-main"]}>
      <h3>Profile</h3>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor={"name"}>Name</label>
        <input
          id="name"
          type="text"
          name={"name"}
          onChange={userDataHandler}
          value={userData.name}
        />
        <label htmlFor={"email"}>Email</label>
        <input
          id="email"
          type="text"
          name={"email"}
          onChange={userDataHandler}
          value={userData.email}
        />
        <button type="submit" disabled={isLoader && true}>
          {isLoader ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
