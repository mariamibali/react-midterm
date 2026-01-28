"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hook";

const Profile = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAppSelector((state) => state.user);

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn || !user) {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

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
        <div className={styles.btnWrapper}>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
