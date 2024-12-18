import React from "react";
import styles from "./style.module.css";
import { User } from "@/types/user/user";

const Members = ({ members }: { members: User[] }) => {
  return (
    <div className={styles.container}>
      {members.map((user) => (
        <div className={styles.userWrap} key={user.id}>
          <p className={styles.username}>{user.nickname}</p>
          <p className={styles.info}>{user.email}</p>
          <p className={styles.info}>{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Members;
