import watodoAxios from "@/libs/axios/watodoAxios";
import { MakeTask } from "@/types/task/makeTask";
import React, { useState } from "react";

const useMakeTask = (
  parentType: "SPRINT" | "WBS",
  parentId: string | undefined,
) => {
  const [taskData, setTaskData] = useState<MakeTask>({
    title: "",
    branch: "",
    start: "",
    deadline: "",
  });
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
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${
          date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }`,
      }));
    } else {
      setTaskData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submit = async () => {
    console.log(!parentId);
    if (
      loading ||
      taskData.title.trim().length < 1 ||
      taskData.branch.trim().length < 1 ||
      Number(new Date(taskData.deadline)) <= Number(new Date(taskData.start)) ||
      Number(new Date(taskData.start)) < Number(today) ||
      !parentId
    ) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await watodoAxios.post(
        `/task/${parentType === "SPRINT" ? "sprint" : "wbs"}`,
        { parentId, ...taskData }
      );
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
      Number(new Date(taskData.start)) < Number(today) ||
      !parentId,
  };
};

export default useMakeTask;
