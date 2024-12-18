"use client";
import React, { SetStateAction } from "react";
import styles from "./style.module.css";
import useMakeTask from "@/hooks/task/useMakeTask";
import { useProjectStore } from "@/store/useProjectStore";
import { Task } from "@/types/task/task";
import useEditTask from "@/hooks/task/useEditTask";
import useDeleteTask from "@/hooks/task/useDeleteTask";

const TaskModal = ({
  type,
  setVisible,
  parentType,
  taskData,
}: {
  type: "CREATE" | "EDIT";
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  parentType: "SPRINT" | "WBS";
  taskData: Task | undefined;
}) => {
  const { project, setProject } = useProjectStore();
  const createHook = useMakeTask(
    parentType,
    parentType === "WBS" ? project?.wbs?.id : project?.sprint?.id
  );
  const editHook = useEditTask(parentType, taskData);
  const deleteHook = useDeleteTask(taskData?.id);

  const currentHook = type === "CREATE" ? createHook : editHook;

  const close = () => setVisible(false);

  const submit = async () => {
    if (type === "CREATE") {
      const data = await currentHook.submit();
      if (project && data) {
        setProject(
          parentType === "WBS"
            ? { ...project, wbs: data }
            : { ...project, sprint: data }
        );
        close();
      }
    } else {
      const data = await editHook.submit();
      if (project && data) {
        setProject(
          parentType === "WBS"
            ? { ...project, wbs: data }
            : { ...project, sprint: data }
        );
        close();
      }
    }
  };

  const deleteSubmit = async () => {
    const data = await deleteHook.submit();
    if (project && data) {
      setProject({ ...project, ...data });
    }
    close();
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const renderInput = (
    name: string,
    placeholder: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
  ) => (
    <>
      <p className={styles.modalSubTitle}>{placeholder}</p>
      <input
        type="text"
        className={styles.modalInput}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );

  return (
    <div className={styles.container} onClick={close}>
      <div className={styles.modal} onClick={stopPropagation}>
        <p className={styles.modalTitle}>
          {type === "CREATE" ? "할 일 생성하기" : "할 일 수정하기"}
        </p>

        {parentType === "SPRINT" && (
          <>
            {renderInput(
              "title",
              "할 일 이름",
              type === "EDIT"
                ? editHook.taskData.title
                : createHook.taskData.title,
              type === "EDIT" ? editHook.handleData : createHook.handleData
            )}
            {renderInput(
              "branch",
              "연결할 브랜치",
              type === "EDIT"
                ? editHook.taskData.branch
                : createHook.taskData.branch,
              type === "EDIT" ? editHook.handleData : createHook.handleData
            )}
          </>
        )}

        {parentType === "WBS" && (
          <>
            {renderInput(
              "title",
              "할 일 이름",
              type === "EDIT"
                ? editHook.taskData.title
                : createHook.taskData.title,
              type === "EDIT" ? editHook.handleData : createHook.handleData
            )}
            {renderInput(
              "branch",
              "연결할 브랜치",
              type === "EDIT"
                ? editHook.taskData.branch
                : createHook.taskData.branch,
              type === "EDIT" ? editHook.handleData : createHook.handleData
            )}
            <p className={styles.modalSubTitle}>시작일</p>
            <input
              type="date"
              className={styles.dateInput}
              name="start"
              onChange={
                type === "EDIT" ? editHook.handleData : createHook.handleData
              }
              value={
                type === "EDIT"
                  ? editHook.taskData.start
                  : createHook.taskData.start
              }
            />
            <p className={styles.modalSubTitle}>종료일</p>
            <input
              type="date"
              className={styles.dateInput}
              name="deadline"
              onChange={
                type === "EDIT" ? editHook.handleData : createHook.handleData
              }
              value={
                type === "EDIT"
                  ? editHook.taskData.deadline
                  : createHook.taskData.deadline
              }
            />
          </>
        )}

        <div className={styles.spacer}></div>
        <p className={styles.warning}>
          {type === "EDIT"
            ? editHook.isFailed && "이미 등록된 브랜치 입니다."
            : createHook.isFailed && "브랜치 생성에 실패 했습니다."}
        </p>
        <button
          className={styles.button}
          onClick={submit}
          disabled={
            type === "EDIT"
              ? editHook.buttonDisabled
              : createHook.buttonDisabled
          }
        >
          {type === "CREATE"
            ? createHook.loading
              ? "생성 중..."
              : "생성하기"
            : editHook.loading
            ? "수정 중..."
            : "수정하기"}
        </button>
        {type === "EDIT" && (
          <button
            className={`${styles.button} ${styles.cancel} ${styles.delete}`}
            onClick={deleteSubmit}
            disabled={deleteHook.loading}
          >
            { deleteHook.loading ? "삭제 중..." : "삭제하기" }
          </button>
        )}
        <button className={`${styles.button} ${styles.cancel}`} onClick={close}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
