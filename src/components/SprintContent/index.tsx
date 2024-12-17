"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SprintTask from "../SprintTask";
import TaskModal from "../TaskModal";
import { useProjectStore } from "@/store/useProjectStore";
import { Task } from "@/types/task/task";
import useEditSprint from "@/hooks/sprint/useEditSprint";

const SprintContent = () => {
  const { project, setProject } = useProjectStore();
  const { ...editHook } = useEditSprint(project?.sprint);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"CREATE" | "EDIT">("CREATE");
  const [targetTask, setTargetTask] = useState<Task>();
  const [doneTask, setDoneTask] = useState<Task[]>([]);

  const clickTask = (task: Task) => {
    setModalType("EDIT");
    setTargetTask(task);
    setModalVisible(true);
  };

  const submit = async () => {
    const data = await editHook.submit();
    if (project && data) {
      setProject({ ...project, sprint: data });
    }
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
          >
            {((doneTask.length / project.sprint.task.length) * 100).toFixed()}%
          </div>
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
      <div className={styles.section}>
        <p className={styles.sectionTitle}>스프린트 설정</p>
        <div className={styles.editSprintWrap}>
          <p className={styles.formSubTitle}>스프린트 제목</p>
          <input
            type="text"
            className={styles.input}
            placeholder="1글자 이상 입력해주세요."
            onChange={editHook.handleData}
            name="title"
            value={editHook.sprintData.title}
          />
          <p className={styles.formSubTitle}>스프린트 설명</p>
          <textarea
            className={styles.textarea}
            placeholder="10글자 이상 입력해주세요."
            onChange={editHook.handleData}
            name="detail"
            value={editHook.sprintData.detail}
          ></textarea>
          <p className={styles.formSubTitle}>스프린트 시작일</p>
          <input
            type="date"
            className={styles.dateInput}
            onChange={editHook.handleData}
            name="start"
            value={editHook.sprintData.start}
          />
          <p className={styles.formSubTitle}>스프린트 종료일</p>
          <input
            type="date"
            className={styles.dateInput}
            onChange={editHook.handleData}
            name="deadline"
            value={editHook.sprintData.deadline}
          />
          <div className={styles.spacer}></div>
          <p className={styles.warning}>
            {editHook.isFailed && "스프린트 수정에 실패했습니다."}
          </p>
          <button
            className={styles.button}
            disabled={editHook.buttonDisabled}
            onClick={submit}
          >
            {editHook.loading ? "수정 중..." : "수정하기"}
          </button>
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
