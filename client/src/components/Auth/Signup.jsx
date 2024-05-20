import styles from "./Auth.module.css";

const Signup = () => {
  return (
    <div className={styles["auth-container-sub"]}>
      <form>
        <label htmlFor={"name"}>Name</label>
        <input
          type={"text"}
          name={"name"}
          id={"name"}
          placeholder={"Your name here..."}
        />
        <label htmlFor={"email"}>Email</label>
        <input type={"text"} id={"email"} placeholder={"Your email here..."} />
        <label htmlFor={"password"}>Password</label>
        <input
          type={"password"}
          id={"password"}
          placeholder={"Your password ..."}
          name={"password"}
        />
        <label htmlFor={"confirm_password"}>Confirm Password</label>
        <input
          type={"text"}
          id={"confirm_password"}
          placeholder={"Your password Again ..."}
          name={"confirm_password"}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
