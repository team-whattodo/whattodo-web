"use client";
import React from "react";
import styles from "./style.module.css";
import useMakeProject from "@/hooks/project/useMakeProject";

const MakeProjectContent = () => {
  const { ...hook } = useMakeProject();

  return (
    <div className={styles.container}>
      <p className={styles.label}>프로젝트 이름</p>
      <input
        type="text"
        className={styles.input}
        placeholder="프로젝트 이름을 3글자 이상 입력해주세요."
        value={hook.projectData.title}
        name="title"
        onChange={hook.handleData}
      />
      <p className={styles.label}>프로젝트 설명</p>
      <textarea
        className={styles.textarea}
        placeholder="프로젝트 설명을 10글자 이상 작성해주세요."
        value={hook.projectData.detail}
        name="detail"
        onChange={hook.handleData}
      ></textarea>
      <p className={styles.label}>깃허브 레포지토리 주소</p>
      <input
        type="text"
        className={styles.input}
        placeholder="깃허브 레포지토리 주소를 입력해주세요. (브라우저 주소창)"
        value={hook.projectData.repository}
        name="repository"
        onChange={hook.handleData}
      />
      <p className={styles.warning}>{!hook.repoValid && "올바르지 않은 레포지토리 주소입니다."}</p>
      <div className={styles.spacer}></div>
      <button className={styles.button} disabled={hook.buttonDisabled} onClick={hook.submit}>{hook.loading ? "생성 중..." : "생성하기"}</button>
    </div>
  );
};

export default MakeProjectContent;
