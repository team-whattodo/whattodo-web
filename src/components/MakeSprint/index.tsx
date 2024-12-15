"use client";
import React from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import useMakeSprint from "@/hooks/sprint/useMakeSprint";

const MakeSprint = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { ...hook } = useMakeSprint(projectId);

  return (
    <div className={styles.container}>
      <p className={styles.formSubTitle}>스프린트 제목</p>
      <input
        type="text"
        className={styles.input}
        placeholder="1글자 이상 입력해주세요."
        onChange={hook.handleData}
        name="title"
        value={hook.sprintData.title}
      />
      <p className={styles.formSubTitle}>스프린트 설명</p>
      <textarea
        className={styles.textarea}
        placeholder="10글자 이상 입력해주세요."
        onChange={hook.handleData}
        name="detail"
        value={hook.sprintData.detail}
      ></textarea>
      <p className={styles.formSubTitle}>스프린트 시작일</p>
      <input
        type="date"
        className={styles.dateInput}
        onChange={hook.handleData}
        name="start"
        value={hook.sprintData.start}
      />
      <p className={styles.formSubTitle}>스프린트 종료일</p>
      <input
        type="date"
        className={styles.dateInput}
        onChange={hook.handleData}
        name="deadline"
        value={hook.sprintData.deadline}
      />
      <div className={styles.spacer}></div>
      <p className={styles.warning}>{hook.isFailed && '스프린트 생성에 실패했습니다.'}</p>
      <button className={styles.button} disabled={hook.buttonDisabled} onClick={hook.submit}>
        {hook.loading ? '생성 중...' : '생성하기'}
      </button>
      <button
        className={`${styles.button} ${styles.cancel}`}
        onClick={() => router.push(`/project/${projectId}`)}
        disabled={hook.loading}
      >
        취소하기
      </button>
    </div>
  );
};

export default MakeSprint;
