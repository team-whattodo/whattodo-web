"use client";
import React, { SetStateAction } from "react";
import styles from "./style.module.css";
import useMakeTask from "@/hooks/task/useMakeTask";
import { useProjectStore } from "@/store/useProjectStore";
import { Task } from "@/types/task/task";
import useEditTask from "@/hooks/task/useEditTask";

const TaskModal = ({
  type,
  setVisible,
  parentType,
  taskData,
}: {
  type: "CREATE" | "EDIT";
  taskId?: string;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  parentType: "SPRINT" | "WBS";
  taskData: Task | undefined;
}) => {
  const { project, setProject } = useProjectStore();
  const createHook = useMakeTask(parentType, project?.sprint?.id);
  const editHook = useEditTask(parentType, taskData);

  const currentHook = type === "CREATE" ? createHook : editHook;

  const close = () => setVisible(false);

  const submit = async () => {
    const data = await currentHook.submit();
    if (project && data) {
      setProject({ ...project, sprint: data });
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
        value={value || ""}
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
              type === "EDIT" ? editHook.taskData.title : createHook.title,
              type === "EDIT" ? editHook.handleData : createHook.handleTitle
            )}

            {type === "EDIT" &&
              renderInput(
                "branch",
                "연결할 브랜치",
                editHook.taskData.branch,
                editHook.handleData
              )}
          </>
        )}

        {parentType === "WBS" && (
          <>
            {renderInput("title", "할 일 이름")}
            <p className={styles.formSubTitle}>시작일</p>
            <input type="date" className={styles.dateInput} />
            <p className={styles.formSubTitle}>종료일</p>
            <input type="date" className={styles.dateInput} />
          </>
        )}

        <div className={styles.spacer}></div>
        <button className={styles.button} onClick={submit}>
          {type === "CREATE"
            ? createHook.loading
              ? "생성 중..."
              : "생성하기"
            : editHook.loading
            ? "수정 중..."
            : "수정하기"}
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={close}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
