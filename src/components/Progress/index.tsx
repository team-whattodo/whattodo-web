import { Task } from "@/types/task/task";
import React from "react";
import styles from "./style.module.css";

const Progress = ({
  doneTask,
  fullTask,
  title,
  detail,
}: {
  doneTask: Task[];
  fullTask: Task[];
  title: string;
  detail: string;
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>"{title}" 스프린트 진척도</p>
      <p className={styles.detail}>{detail}</p>
      <div className={styles.progressWrap}>
        <div
          className={styles.progress}
          style={{
            width: `${(doneTask.length / fullTask.length) * 100}%`,
          }}
        >
          {fullTask.length !== 0 && (doneTask.length / fullTask.length) * 100 >=
            10 && (
            <p className={styles.percentage}>
              {((doneTask.length / fullTask.length) * 100).toFixed() + "%"}
            </p>
          )}
        </div>
      </div>
      <div className={styles.taskCounterWrap}>
        {fullTask.map((task, idx) => {
          if (idx !== fullTask.length - 1) {
            return <span className={styles.taskCounter} key={task.id}></span>;
          }
        })}
      </div>
    </div>
  );
};

export default Progress;
