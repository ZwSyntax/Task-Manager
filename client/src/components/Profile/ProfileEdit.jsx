import styles from "./ProfileEdit.module.css";

const ProfileEdit = () => {
  return (
    <div className={styles["profile-edit-main"]}>
      <h3>Profile</h3>
      <form>
        <label htmlFor={"name"}>Name</label>
        <input id="name" type="text" name={"name"} />
        <label htmlFor={"email"}>Email</label>
        <input id="email" type="text" name={"email"} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
