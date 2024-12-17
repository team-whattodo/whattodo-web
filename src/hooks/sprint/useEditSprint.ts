import watodoAxios from "@/libs/axios/watodoAxios";
import { EditSprint } from "@/types/sprint/editSprint";
import { Sprint } from "@/types/sprint/sprint";
import React, { useState } from "react";

const useEditSprint = (sprint?: Sprint | null) => {
  const [sprintData, setSprintData] = useState<EditSprint>({
    title: sprint?.title ?? "",
    detail: sprint?.detail ?? "",
    start: sprint?.start ?? "",
    deadline: sprint?.deadline ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSprintData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (
      loading ||
      !sprint ||
      sprintData.title.trim().length < 1 ||
      sprintData.detail.trim().length < 10 ||
      sprintData.start.length < 1 ||
      sprintData.deadline.length < 1
    ) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await watodoAxios.patch(
        `/sprint/${sprint.id}`,
        sprintData
      );
      return data;
    } catch {
      setIsFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    sprintData,
    loading,
    isFailed,
    submit,
    handleData,
    buttonDisabled:
      loading ||
      !sprint ||
      sprintData.title.trim().length < 1 ||
      sprintData.detail.trim().length < 10 ||
      sprintData.start.length < 1 ||
      sprintData.deadline.length < 1 ||
      (sprintData.title === sprint.title &&
        sprintData.detail === sprint.detail &&
        sprintData.start === sprint.start &&
        sprintData.deadline === sprint.deadline),
  };
};

export default useEditSprint;
