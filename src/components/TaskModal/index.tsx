"use client";
import React, { SetStateAction } from "react";
import styles from "./style.module.css";
import useMakeTask from "@/hooks/task/useMakeTask";
import { useProjectStore } from "@/store/useProjectStore";

const TaskModal = ({
  type,
  setVisible,
  parentType,
}: {
  type: "CREATE" | "EDIT";
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  parentType: "SPRINT" | "WBS";
}) => {
  const { project, setProject } = useProjectStore();
  const { ...hook } = useMakeTask(parentType, project?.sprint?.id);
  const close = () => {
    setVisible(false);
  };

  const submit = async () => {
    const data = await hook.submit();
    if (project) {
      setProject({ ...project, sprint: data });
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
              onChange={hook.handleTitle}
              value={hook.title}
            />
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
        ) : (
          <>
            <p className={styles.modalSubTitle}>할 일 이름</p>
            <input
              type="text"
              className={styles.modalInput}
              placeholder="어떤 것을 개발해야 하나요? (1글자 이상)"
            />
            <p className={styles.formSubTitle}>스프린트 시작일</p>
            <input type="date" className={styles.dateInput} />
            <p className={styles.formSubTitle}>스프린트 종료일</p>
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
          생성하기
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={close}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
