"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SprintTask from "../SprintTask";
import TaskModal from "../TaskModal";
import { useProjectStore } from "@/store/useProjectStore";

const SprintContent = () => {
  const { project, setProject } = useProjectStore();
  let doneTask = [];
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(project?.sprint);
    if (project?.sprint) {
      doneTask = project?.sprint?.task.filter((item) => item.done);
    }
  }, [project?.sprint]);

  if (!project?.sprint?.task) {
    return <div className={styles.container}></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>
          "{project?.sprint?.title}" 스프린트 진척도
        </p>
        <p className={styles.sprintDetail}>{project?.sprint?.detail}</p>
        <div className={styles.progressWrap}>
          <div
            className={styles.progress}
            style={{
              width: `${(project.sprint.task.length / doneTask.length) * 100}`,
            }}
          ></div>
        </div>
        <div className={styles.taskCounterWrap}>
          {project?.sprint?.task.map((task, idx) => {
            if (project.sprint && idx !== project.sprint.task.length - 1) {
              return <span className={styles.taskCounter} key={task.id}></span>;
            }
          })}
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>할 일 목록</p>
        <div className={styles.taskWrap}>
          {project?.sprint?.task.map((task) => (
            <SprintTask data={task} key={task.id} />
          ))}
          <div className={styles.addTask} onClick={() => setModalVisible(true)}>
            +
          </div>
        </div>
      </div>
      {modalVisible && (
        <TaskModal
          type="CREATE"
          setVisible={setModalVisible}
          parentType="SPRINT"
        />
      )}
    </div>
  );
};

export default SprintContent;
