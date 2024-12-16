import watodoAxios from "@/libs/axios/watodoAxios";
import { EditTask } from "@/types/task/editTask";
import { Task } from "@/types/task/task";
import React, { useState } from "react";

const useEditTask = (parentType: "SPRINT" | "WBS", task?: Task) => {
  const [taskData, setTaskData] = useState<EditTask>({
    title: task?.title ?? "",
    branch: task?.branch ? task?.branch.split(":")[1] : "",
  });
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    console.log(!task?.id);
    console.log(
      taskData.title.trim().length < 1 || taskData.branch.trim().length < 1
    );
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
      taskData.branch.trim().length < 1,
  };
};

export default useEditTask;
