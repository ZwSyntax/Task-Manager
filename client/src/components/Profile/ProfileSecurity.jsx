import styles from "./ProfileEdit.module.css";
import { useState } from "react";

const URL = import.meta.env.VITE_SERVER_URL;

const profileSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoader, setIsLoder] = useState(false);

  const passwordDataHandler = (e) => {
    const { name, value } = e.target;

    setPasswordData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const passwordUpdateHandler = (e) => {
    e.preventDefault();

    const url = URL + "editpassword";

    setIsLoder(true);
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("password update issue");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPasswordData((prevState) => {
          return {
            ...prevState,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          };
        });
        setIsLoder(false);
      });
  };

  return (
    <div className={styles["profile-edit-main"]}>
      <h3>Security</h3>
      <form onSubmit={passwordUpdateHandler}>
        <label htmlFor={"oldpass"}>Old Password</label>
        <input
          onChange={passwordDataHandler}
          id="oldpass"
          type="password"
          name={"oldPassword"}
          value={passwordData.oldPassword}
        />
        <label htmlFor={"newpass"}>New Password</label>
        <input
          onChange={passwordDataHandler}
          id="newpass"
          type="password"
          name={"newPassword"}
          value={passwordData.newPassword}
        />
        <label htmlFor={"conpass"}>Confirm Password</label>
        <input
          onChange={passwordDataHandler}
          id="conpass"
          type="text"
          name={"confirmPassword"}
          value={passwordData.confirmPassword}
        />
        <button type="submit"> {isLoader ? "Loading..." : "Update"}</button>
      </form>
    </div>
  );
};

export default profileSecurity;
