import watodoAxios from "@/libs/axios/watodoAxios";
import { MakeWbs } from "@/types/wbs/makeWbs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useMakeWbs = (parentId: string) => {
  const [wbsData, setWbsData] = useState<MakeWbs>({ title: "", detail: "", parentId });
  const router = useRouter();

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWbsData((prev) => ({ ...prev, [name]: value }));
  };
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const submit = async () => {
    if (loading || wbsData.title.trim().length < 1 || wbsData.detail.trim().length < 10) {
      return;
    }
    try{
      setLoading(true);
      await watodoAxios.post('/wbs', wbsData);
      router.push(`/project/${parentId}`);
    }catch{
      setIsFailed(true);
    }finally{
      setLoading(false);
    }
  }

  return {
    handleData,
    isFailed,
    submit,
    wbsData,
    loading,
    buttonDisabled:
      loading ||
      wbsData.title.trim().length < 1 ||
      wbsData.detail.trim().length < 10,
  };
};

export default useMakeWbs;
