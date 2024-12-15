"use client";
import { Sprint } from "@/types/sprint/sprint";
import React, { useState } from "react";
import styles from "./style.module.css";
import SprintTask from "../SprintTask";
import TaskModal from "../TaskModal";

const SprintContent = ({ data }: { data: Sprint }) => {
  const doneTask = data.tasks.filter((item) => item.done);
  const [modalVisible, setModalVisible] = useState(false);

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
            <div className={styles.addTask} onClick={() => setModalVisible(true)}>+</div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <TaskModal
          type="CREATE"
          setVisible={setModalVisible}
          parentType="SPRINT"
          parentId={data.id}
        />
      )}
    </div>
  );
};

export default SprintContent;
