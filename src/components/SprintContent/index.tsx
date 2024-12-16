"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SprintTask from "../SprintTask";
import TaskModal from "../TaskModal";
import { useProjectStore } from "@/store/useProjectStore";
import { Task } from "@/types/task/task";

const SprintContent = () => {
  const { project, setProject } = useProjectStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"CREATE" | "EDIT">("CREATE");
  const [targetTask, setTargetTask] = useState<Task>();
  const [doneTask, setDoneTask] = useState<Task[]>([]);

  const clickTask = (task: Task) => {
    setModalType("EDIT");
    setTargetTask(task);
    setModalVisible(true);
  };

  useEffect(() => {
    setDoneTask(project?.sprint?.task.filter((item) => item.done) || []);
  }, [project?.sprint?.task]);

  useEffect(() => {
    console.log(doneTask);
    if (project?.sprint) {
      console.log((doneTask.length / project.sprint.task.length) * 100);
    }
  }, [doneTask]);

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
              width: `${(doneTask.length / project.sprint.task.length) * 100}%`,
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
            <SprintTask
              data={task}
              key={task.id}
              onClick={() => clickTask(task)}
            />
          ))}
          <div
            className={styles.addTask}
            onClick={() => {
              setModalVisible(true);
              setTargetTask(undefined);
              setModalType("CREATE");
            }}
          >
            +
          </div>
        </div>
      </div>
      {modalVisible && (
        <TaskModal
          type={modalType}
          setVisible={setModalVisible}
          parentType="SPRINT"
          taskData={targetTask}
        />
      )}
    </div>
  );
};

export default SprintContent;
