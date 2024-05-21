import styles from "./ProfileEdit.module.css";
import { useEffect, useState } from "react";
import { uiAction } from "../../store/ui.js";
import { useDispatch } from "react-redux";

const URL = import.meta.env.VITE_SERVER_URL;

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [isLoader, setIsLoader] = useState(false);

  const validateInput = (name, value) => {
    let error = "";
    if (name === "name" && value.length < 4) {
      error = "Name must be at least 4 characters long.";
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Email is invalid.";
    }
    return error;
  };

  const userDataHandler = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);

    setUserData((prevState) => {
      return { ...prevState, [name]: value };
    });
    setErrors((prevState) => {
      return { ...prevState, [name]: error };
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
        setUserData({
          name: data.data.name,
          email: data.data.email,
        });
      })
      .catch((err) => {
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
        console.log(err);
      });
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (errors.name || errors.email) {
      dispatch(
        uiAction.errorMessageHandler({
          message: "Please fix the errors.",
        }),
      );
      return;
    }

    const url = URL + "user";
    setIsLoader(true);
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
        dispatch(uiAction.messageHandler({ message: "Edit Done!" }));
        setUserData({
          name: data.data.name,
          email: data.data.email,
        });
        console.log(data);
      })
      .catch((err) => {
        dispatch(
          uiAction.errorMessageHandler({ message: "Something went wrong!" }),
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoader(false);
      });
  };

  return (
    <div className={styles["profile-edit-main"]}>
      <h3>Profile</h3>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={userDataHandler}
          value={userData.name}
        />
        {errors.name && (
          <p className={styles["error-message"]}>{errors.name}</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          onChange={userDataHandler}
          value={userData.email}
        />
        {errors.email && (
          <p className={styles["error-message"]}>{errors.email}</p>
        )}
        <button type="submit" disabled={isLoader}>
          {isLoader ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
