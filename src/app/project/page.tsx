"use client";
import React from "react";
import styles from "./page.module.css";
import MakeProjectContent from "@/components/MakeProjectContent";

const MakeProject = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>프로젝트 생성하기</p>
      <MakeProjectContent />
    </div>
  );
};

export default MakeProject;
