import styles from "./page.module.css";

const Profile = async () => {
  const resp = await fetch("https://fakestoreapi.com/users/3", {
    method: "GET",
    cache: "no-store",
  });
  if (!resp.ok) {
    throw new Error("Failed to fetch user");
  }
  const user = await resp.json();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          {user.name.firstname[0]}
          {user.name.lastname[0]}
        </div>
        <h2 className={styles.name}>
          {user.name.firstname} {user.name.lastname}
        </h2>
        <p className={styles.username}>@{user.username}</p>
        <p className={styles.status}>Active user</p>
        <div className={styles.info}>
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>Phone:</span> {user.phone}
          </p>
          <p>
            <span>City:</span> {user.address.city}
          </p>
          <p>
            <span>Street:</span> {user.address.street}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
