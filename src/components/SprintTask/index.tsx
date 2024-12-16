"use client";
import React from "react";
import styles from "./style.module.css";
import { Task } from "@/types/task/task";

const SprintTask = ({ data }: { data: Task }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: data.done ? "var(--color-300)" : "" }}
    >
      <p className={styles.taskTitle}>{data.title}</p>
      <p className={styles.isDone}>
        {data.done
          ? "개발을 완료했습니다."
          : data.branch === null
          ? "연결된 브랜치가 없습니다."
          : "아직 개발 중입니다."}
      </p>
      {data.branch && (
        <div className={styles.branch}>{data.branch.split(":")[1]}</div>
      )}
    </div>
  );
};

export default SprintTask;
