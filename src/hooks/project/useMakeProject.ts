import { REPOSITORY_REGEX } from "@/constants/regex";
import watodoAxios from "@/libs/axios/watodoAxios";
import { MakeProject } from "@/types/project/makeProject";
import { Project } from "@/types/project/project";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useMakeProject = () => {
  const [projectData, setProjectData] = useState<MakeProject>({
    title: "",
    detail: "",
    repository: "",
  });
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [repoValid, setRepoValid] = useState(true);
  const router = useRouter();

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    if (REPOSITORY_REGEX.test(projectData.repository) || projectData.repository.trim().length === 0) {
      setRepoValid(true);
    }else{
      setRepoValid(false);
    }
  }, [projectData.repository]);

  const submit = async () => {
    if (
      loading ||
      !repoValid ||
      projectData.title.trim().length < 1 ||
      projectData.detail.trim().length < 10 ||
      projectData.repository.trim().length === 0
    ) {
      return;
    }
    try {
      setLoading(true);
      const { data } : { data: Project } = await watodoAxios.post("/project", projectData);
      if (data) {
        router.push(`/project/${data.id}/intro`);
        setLoading(false);
      }
    } catch {
      setIsFailed(true);
    }
  };

  return {
    isFailed,
    submit,
    handleData,
    repoValid,
    projectData,
    buttonDisabled:
      loading ||
      !repoValid ||
      projectData.title.trim().length === 0 ||
      projectData.detail.trim().length === 0 ||
      projectData.repository.trim().length === 0,
    loading
  };
};

export default useMakeProject;
