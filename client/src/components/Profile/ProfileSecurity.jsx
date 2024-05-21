import styles from "./ProfileEdit.module.css";
import { useState } from "react";
import { uiAction } from "../../store/ui.js";
import { useDispatch } from "react-redux";

const URL = import.meta.env.VITE_SERVER_URL;

const ProfileSecurity = () => {
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoader, setIsLoader] = useState(false);

  const validatePassword = (name, value) => {
    let error = "";
    if (value.length < 6) {
      error = "Password must be at least 6 characters long.";
    }
    if (name === "confirmPassword" && value !== passwordData.newPassword) {
      error = "Passwords do not match.";
    }
    if (
      name === "newPassword" &&
      passwordData.confirmPassword &&
      value !== passwordData.confirmPassword
    ) {
      error = "Passwords do not match.";
    }
    return error;
  };

  const passwordDataHandler = (e) => {
    const { name, value } = e.target;
    const error = validatePassword(name, value);

    setPasswordData((prevState) => {
      return { ...prevState, [name]: value };
    });
    setErrors((prevState) => {
      return { ...prevState, [name]: error };
    });
  };

  const passwordUpdateHandler = (e) => {
    e.preventDefault();

    const oldPasswordError = validatePassword(
      "oldPassword",
      passwordData.oldPassword,
    );
    const newPasswordError = validatePassword(
      "newPassword",
      passwordData.newPassword,
    );
    const confirmPasswordError = validatePassword(
      "confirmPassword",
      passwordData.confirmPassword,
    );

    if (oldPasswordError || newPasswordError || confirmPasswordError) {
      setErrors({
        oldPassword: oldPasswordError,
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      });
      dispatch(
        uiAction.errorMessageHandler({
          message: "Please fix the errors.",
        }),
      );
      return;
    }

    const url = URL + "editpassword";

    setIsLoader(true);
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
        dispatch(uiAction.messageHandler({ message: "Password Update Done!" }));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
      })
      .finally(() => {
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsLoader(false);
      });
  };

  return (
    <div className={styles["profile-edit-main"]}>
      <h3>Security</h3>
      <form onSubmit={passwordUpdateHandler}>
        <label htmlFor="oldpass">Old Password</label>
        <input
          onChange={passwordDataHandler}
          id="oldpass"
          type="password"
          name="oldPassword"
          value={passwordData.oldPassword}
        />
        {errors.oldPassword && (
          <p className={styles["error-message"]}>{errors.oldPassword}</p>
        )}
        <label htmlFor="newpass">New Password</label>
        <input
          onChange={passwordDataHandler}
          id="newpass"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
        />
        {errors.newPassword && (
          <p className={styles["error-message"]}>{errors.newPassword}</p>
        )}
        <label htmlFor="conpass">Confirm Password</label>
        <input
          onChange={passwordDataHandler}
          id="conpass"
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className={styles["error-message"]}>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={isLoader}>
          {isLoader ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSecurity;
