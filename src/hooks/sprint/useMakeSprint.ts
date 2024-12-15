import watodoAxios from "@/libs/axios/watodoAxios";
import { MakeSprint } from "@/types/sprint/makeSprint";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useMakeSprint = (parentId: string) => {
  const [sprintData, setSprintData] = useState<MakeSprint>({
    title: "",
    detail: "",
    start: "",
    deadline: "",
    parentId
  });
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const router = useRouter();
  const today = new Date();

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "start" || name === "deadline") {
      const date = new Date(value);
      setSprintData((prev) => ({
        ...prev,
        [name]: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
      }));
    } else {
      setSprintData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submit = async () => {
    if (
      loading ||
      sprintData.title.trim().length < 1 ||
      sprintData.detail.trim().length < 10 ||
      sprintData.start.trim().length === 0 ||
      sprintData.deadline.trim().length === 0 ||
      Number(new Date(sprintData.deadline)) <=
        Number(new Date(sprintData.start)) ||
      Number(new Date(sprintData.start)) < Number(today)
    ) {
      return;
    }
    try{
      setLoading(true);
      await watodoAxios.post('/sprint', sprintData);
      router.push(`/project/${parentId}`);
    }catch{
      setIsFailed(true);
    }finally{
      setLoading(false);
    }
  };

  return {
    sprintData,
    handleData,
    submit,
    isFailed,
    loading,
    buttonDisabled:
      loading ||
      sprintData.title.trim().length < 1 ||
      sprintData.detail.trim().length < 10 ||
      sprintData.start.trim().length === 0 ||
      sprintData.deadline.trim().length === 0 ||
      Number(new Date(sprintData.deadline)) <=
        Number(new Date(sprintData.start)) ||
      Number(new Date(sprintData.start)) < Number(today),
  };
};

export default useMakeSprint;
