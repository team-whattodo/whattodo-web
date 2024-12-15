import watodoAxios from "@/libs/axios/watodoAxios";
import React, { useState } from "react";

const useMakeTask = (parentType: "SPRINT" | "WBS", parentId: string) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const submit = async () => {
    if (loading || title.trim().length < 1) {
      return;
    }
    try {
      setLoading(true);
      await watodoAxios.post(
        `/task/${parentType === "SPRINT" ? "sprint" : "wbs"}`,
        { title, parentId }
      );
    } catch {
      setIsFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    handleTitle,
    loading,
    isFailed,
    submit,
    buttonDisabled: loading || title.trim().length < 1,
  };
};

export default useMakeTask;
