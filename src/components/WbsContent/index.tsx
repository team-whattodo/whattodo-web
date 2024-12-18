"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useProjectStore } from "@/store/useProjectStore";
import { Task } from "@/types/task/task";
import Progress from "../Progress";
import GanttChart from "../Gantt";

const WbsContent = () => {
  const { project, setProject } = useProjectStore();
  const [doneTask, setDoneTask] = useState<Task[]>([]);

  useEffect(() => {
    setDoneTask(project?.wbs?.task.filter((item) => item.done) || []);
  }, [project?.wbs?.task]);

  if (!project?.wbs?.task) {
    return <div className={styles.container}></div>;
  }

  return (
    <div className={styles.container}>
      <Progress
        fullTask={project.wbs.task}
        doneTask={doneTask}
        title={project.wbs.title}
        detail={project.wbs.detail}
      />
      <div className={styles.section}>
        <p className={styles.sectionTitle}>WBS 일정</p>
        <GanttChart tasks={project.wbs.task} />
      </div>
    </div>
  );
};

export default WbsContent;
