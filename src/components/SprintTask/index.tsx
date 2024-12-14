"use client";
import React from "react";
import styles from "./style.module.css";
import { Task } from "@/types/task/task";

const SprintTask = ({ data } : { data: Task }) => {
  return (
    <div className={styles.container} style={{backgroundColor: data.done ? 'var(--color-300)' : ''}}>
      <div>{data.title}</div>
    </div>
  );
};

export default SprintTask;
