import styles from "./Auth.module.css";

const Login = () => {
  return (
    <div className={styles["auth-container-sub"]}>
      <form>
        <label htmlFor={"email"}>Email</label>
        <input type={"text"} id={"email"} placeholder={"Your email here..."} />
        <label htmlFor={"password"}>Password</label>
        <input
          type={"password"}
          id={"password"}
          placeholder={"Your password ..."}
          name={"password"}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
