"use client";
import React from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import useMakeWbs from "@/hooks/wbs/useMakeWbs";

const MakeWbs = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { ...hook } = useMakeWbs(projectId);

  return (
    <div className={styles.container}>
      <p className={styles.formSubTitle}>WBS 제목</p>
      <input
        type="text"
        className={styles.input}
        placeholder="1글자 이상 입력해주세요."
        onChange={hook.handleData}
        name="title"
        value={hook.wbsData.title}
      />
      <p className={styles.formSubTitle}>WBS 설명</p>
      <textarea
        className={styles.textarea}
        placeholder="10글자 이상 입력해주세요."
        onChange={hook.handleData}
        name="detail"
        value={hook.wbsData.detail}
      ></textarea>
      <button
        className={styles.button}
        disabled={hook.buttonDisabled}
        onClick={hook.submit}
      >
        {hook.loading ? "생성 중..." : "생성하기"}
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

export default MakeWbs;
