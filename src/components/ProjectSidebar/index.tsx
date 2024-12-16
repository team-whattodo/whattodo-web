"use client";
import React from "react";
import styles from "./style.module.css";
import useEditProject from "@/hooks/project/useEditProject";
import { useProjectStore } from "@/store/useProjectStore";

const ProjectSidebar = () => {
  const { project, setProject } = useProjectStore();
  const { ...hook } = useEditProject(project);

  const submit = async () => {
    const data = await hook.submit();
    if (data) {
      setProject(data);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.sidebarTitle}>프로젝트 설정</p>
      <p className={styles.sidebarSubTitle}>프로젝트 이름</p>
      <input
        type="text"
        className={styles.sidebarInput}
        value={hook.projectData.title}
        onChange={hook.handleData}
        name="title"
      />
      <p className={styles.warning}>
        {hook.projectData.title.trim().length < 1 && "1글자 이상 입력해주세요."}
      </p>
      <p className={styles.sidebarSubTitle}>프로젝트 설명</p>
      <textarea
        className={styles.sidebarTextarea}
        value={hook.projectData.detail}
        onChange={hook.handleData}
        name="detail"
      ></textarea>
      <p className={styles.warning}>
        {hook.projectData.detail.trim().length < 10 &&
          "10글자 이상 입력해주세요."}
      </p>
      <p className={styles.sidebarSubTitle}>연결된 깃허브 레포지토리</p>
      <input
        type="text"
        className={styles.sidebarInput}
        value={hook.projectData.repository}
        onChange={hook.handleData}
        name="repository"
      />
      <p className={styles.warning}>
        {!hook.repoValid && "올바르지 않은 레포지토리 주소입니다."}
      </p>
      <p className={styles.sidebarSubTitle}>참가 코드</p>
      <input type="text" className={styles.sidebarInput} readOnly value={project?.id} />
      <div className={styles.spacer}></div>
      <p className={styles.warning} style={{ margin: 0 }}>
        {hook.isFailed && "저장에 실패했습니다."}
      </p>
      <div className={styles.buttonWrap}>
        <button
          className={styles.button}
          onClick={submit}
          disabled={hook.buttonDisabled}
        >
          {hook.loading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};

export default ProjectSidebar;
