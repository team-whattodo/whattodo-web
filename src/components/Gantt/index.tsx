import React, { useState } from "react";
import styles from "./style.module.css";
import { Task } from "@/types/task/task";
import TaskModal from "../TaskModal";

const GanttChart = ({ tasks }: { tasks: Task[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"CREATE" | "EDIT">("CREATE");
  const [targetTask, setTargetTask] = useState<Task>();

  const taskStartDates = tasks.map((task) => new Date(task.start));
  const earliestStartDate = new Date(
    Math.min(...taskStartDates.map((date) => date.getTime()))
  );

  const latestEndDate = new Date(
    Math.max(...tasks.map((task) => new Date(task.deadline).getTime()))
  );
  const totalDays =
    (latestEndDate.getTime() - earliestStartDate.getTime()) /
      (1000 * 60 * 60 * 24) +
    1;

  const calculatePosition = (taskStart: string, taskEnd: string) => {
    const startDiff =
      (new Date(taskStart).getTime() - earliestStartDate.getTime()) /
      (1000 * 60 * 60 * 24);
    const duration =
      (new Date(taskEnd).getTime() - new Date(taskStart).getTime()) /
        (1000 * 60 * 60 * 24) +
      1;
    return { start: startDiff, length: duration };
  };

  const dateList = Array.from({ length: totalDays }, (_, index) => {
    const currentDate = new Date(earliestStartDate);
    currentDate.setDate(currentDate.getDate() + index);
    return currentDate.toISOString().split("T")[0];
  });

  const handleTaskClick = (task: Task) => {
    setTargetTask(task);
    setModalType("EDIT");
    setModalVisible(true);
  };

  return (
    <div className={styles.chartContainer}>
      <table className={styles.chartTable}>
        <thead>
          <tr>
            <th className={styles.taskHeader}>Task</th>
            {dateList.map((date, index) => (
              <th key={index} className={styles.dateHeader}>
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const { start, length } = calculatePosition(
              task.start,
              task.deadline
            );
            return (
              <tr key={task.id}>
                <td className={styles.taskTitle}>{task.title}</td>
                <td colSpan={totalDays} className={styles.chartCell}>
                  <div
                    className={styles.taskBar}
                    style={{
                      left: `calc(${(start / totalDays) * 100}% + 0.5rem)`,
                      width: `calc(${(length / totalDays) * 100}% - 2rem)`,
                    }}
                    onClick={() => handleTaskClick(task)}
                  >
                    {task.branch.split(":")[1]}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalVisible && (
        <TaskModal
          type={modalType}
          setVisible={setModalVisible}
          parentType="WBS"
          taskData={targetTask}
        />
      )}
    </div>
  );
};

export default GanttChart;
