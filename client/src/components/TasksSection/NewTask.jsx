import styles from "./NewTask.module.css";

const NewTask = () => {
  return (
    <div className={styles["new-task-container"]}>
      <div className={styles["new-task-container-sub"]}>
        <form>
          <label htmlFor={"newtask"}>New Task</label>
          <input
            type={"text"}
            id={"newtask"}
            placeholder={"Add New Task"}
            name={"newtask"}
          />
          <label htmlFor={"conpass"}>Priority</label>
          <select id={"pri"}>
            <option value={""}>Select Priority</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
          <button type="submit">Add New Task</button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
