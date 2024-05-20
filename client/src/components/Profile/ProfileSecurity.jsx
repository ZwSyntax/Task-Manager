import styles from "./ProfileEdit.module.css";

const profileSecurity = () => {
  return (
    <div className={styles["profile-edit-main"]}>
      <h3>Security</h3>
      <form>
        <label htmlFor={"oldpass"}>Old Password</label>
        <input id="oldpass" type="password" name={"oldpass"} />
        <label htmlFor={"newpass"}>New Password</label>
        <input id="newpass" type="password" name={"newpass"} />
        <label htmlFor={"conpass"}>Confirm Password</label>
        <input id="conpass" type="text" name={"conpass"} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default profileSecurity;
