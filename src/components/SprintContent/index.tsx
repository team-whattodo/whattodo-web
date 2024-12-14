"use client";
import { Sprint } from "@/types/sprint/sprint";
import React from "react";
import styles from "./sprintContent.module.css";
import SprintTask from "../SprintTask";

const SprintContent = ({ data }: { data: Sprint }) => {
  const doneTask = data.tasks.filter((item) => item.done);
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>"{data.title}" 스프린트 진척도</p>
        <p className={styles.sprintDetail}>{data.detail}</p>
        <div className={styles.progressWrap}>
          <div
            className={styles.progress}
            style={{ width: `${(data.tasks.length / doneTask.length) * 100}` }}
          ></div>
        </div>
        <div className={styles.taskCounterWrap}>
          {data.tasks.map((task, idx) => {
            if (idx !== data.tasks.length - 1) {
              return <span className={styles.taskCounter} key={task.id}></span>;
            }
          })}
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>할 일 목록</p>
        <div className={styles.taskWrap}>
          {data.tasks.map((task) => (
            <SprintTask data={task} key={task.id} />
          ))}
          <div className={styles.addTaskWrap}>
            <div className={styles.addTask}>+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintContent;
