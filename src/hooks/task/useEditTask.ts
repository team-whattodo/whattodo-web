import watodoAxios from "@/libs/axios/watodoAxios";
import { EditTask } from "@/types/task/editTask";
import { Task } from "@/types/task/task";
import React, { useState } from "react";

const useEditTask = (parentType: "SPRINT" | "WBS", task?: Task) => {
  console.log(task?.branch);
  const [taskData, setTaskData] = useState<EditTask>({
    title: task?.title || "",
    branch: task?.branch ? task?.branch.split(":")[1] : "",
    start: task?.start || "",
    deadline: task?.deadline || "",
  });
  console.log(taskData.branch);
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const today = new Date();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "start" || name === "deadline") {
      const date = new Date(value);
      setTaskData((prev) => ({
        ...prev,
        [name]: `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? "0" + date.getMonth() + 1
            : date.getMonth() + 1
        }-${date.getDate()}`,
      }));
    } else {
      setTaskData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submit = async () => {
    if (loading || !task) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await watodoAxios.patch(
        `/task/${parentType === "SPRINT" ? "sprint" : "wbs"}/${task.id}`,
        {
          title: taskData.title.trim().length > 0 ? taskData.title : task.title,
          branch:
            taskData.branch.trim().length > 0 ? taskData.branch : task.branch,
          start: taskData.start,
          deadline: taskData.deadline,
        }
      );
      console.log(data);
      return data;
    } catch {
      setIsFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    taskData,
    handleData,
    loading,
    isFailed,
    submit,
    buttonDisabled:
      loading ||
      taskData.title.trim().length < 1 ||
      taskData.branch.trim().length < 1 ||
      Number(new Date(taskData.deadline)) <= Number(new Date(taskData.start)) ||
      Number(new Date(taskData.start)) < Number(today),
  };
};

export default useEditTask;
