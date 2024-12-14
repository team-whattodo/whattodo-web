"use client";
import React from "react";
import styles from "./style.module.css";
import { Project } from "@/types/project/project";

const ProjectSidebar = ({ project }: { project: Project }) => {
  return (
    <div className={styles.container}>
      <p className={styles.sidebarTitle}>프로젝트 설정</p>
      <p className={styles.sidebarSubTitle}>프로젝트 이름</p>
      <input
        type="text"
        className={styles.sidebarInput}
        value={project.title}
      />
      <p className={styles.sidebarSubTitle}>프로젝트 설명</p>
      <textarea
        className={styles.sidebarTextarea}
        value={project.detail}
      ></textarea>
      <p className={styles.sidebarSubTitle}>연결된 깃허브 레포지토리</p>
      <input
        type="text"
        className={styles.sidebarInput}
        value={project.repository}
      />
    </div>
  );
};

export default ProjectSidebar;
