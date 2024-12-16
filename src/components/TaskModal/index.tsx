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
  const { ...hook } = useMakeTask(parentType, project?.sprint?.id);
  const { ...editHook } = useEditTask(parentType, taskData);

  const close = () => {
    setVisible(false);
  };

  const submit = async () => {
    if (type === "CREATE") {
      const data = await hook.submit();
      if (project && data) {
        setProject({ ...project, sprint: data });
      }
    } else {
      const data = await editHook.submit();
      console.log(data);
      if (project && data) {
        setProject({ ...project, sprint: data });
      }
    }
    close();
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container} onClick={close}>
      <div className={styles.modal} onClick={stopPropagation}>
        <p className={styles.modalTitle}>할 일 생성하기</p>
        {parentType === "SPRINT" ? (
          <>
            <p className={styles.modalSubTitle}>할 일 이름</p>
            <input
              type="text"
              className={styles.modalInput}
              placeholder="어떤 것을 개발해야 하나요? (1글자 이상)"
              onChange={
                type === "EDIT" ? editHook.handleData : hook.handleTitle
              }
              value={
                type === "EDIT" ? editHook.taskData.title : hook.title || ""
              }
            />
            {type === "EDIT" && (
              <>
                <p className={styles.modalSubTitle}>연결할 브랜치</p>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="브랜치 이름을 입력해주세요."
                  name="branch"
                  onChange={editHook.handleData}
                  value={editHook.taskData.branch || ""}
                />
              </>
            )}
          </>
        ) : (
          <>
            <p className={styles.modalSubTitle}>할 일 이름</p>
            <input
              type="text"
              className={styles.modalInput}
              placeholder="어떤 것을 개발해야 하나요? (1글자 이상)"
            />
            <p className={styles.formSubTitle}>시작일</p>
            <input type="date" className={styles.dateInput} />
            <p className={styles.formSubTitle}>종료일</p>
            <input type="date" className={styles.dateInput} />
            {type === "EDIT" && (
              <>
                <p className={styles.modalSubTitle}>연결할 브랜치</p>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="브랜치 이름을 입력해주세요."
                />
              </>
            )}
          </>
        )}

        <div className={styles.spacer}></div>
        <button className={styles.button} onClick={submit}>
          {type === "CREATE"
            ? hook.loading
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
