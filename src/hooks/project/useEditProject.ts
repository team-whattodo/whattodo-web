import { REPOSITORY_REGEX } from "@/constants/regex";
import watodoAxios from "@/libs/axios/watodoAxios";
import { MakeProject } from "@/types/project/makeProject";
import { ProjectDetail } from "@/types/project/projectDetail";
import React, { useEffect, useState } from "react";

const useEditProject = (project: ProjectDetail) => {
  const [projectData, setProjectData] = useState<MakeProject>({
    title: project.title,
    detail: project.detail,
    repository: `https://github.com/${project.repository}`,
  });
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [repoValid, setRepoValid] = useState(true);
  const [isChanged, setIsChanged] = useState(true);

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    setIsChanged(
      project.title !== projectData.title ||
        project.detail !== projectData.detail ||
        `https://github.com/${project.repository}` !== projectData.repository
    );
  },[projectData]);

  useEffect(() => {
    if (
      REPOSITORY_REGEX.test(projectData.repository) ||
      projectData.repository.trim().length === 0
    ) {
      setRepoValid(true);
    } else {
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
      const { data } = await watodoAxios.patch(
        `/project/${project.id}`,
        projectData
      );
      if (data) {
        return data;
      }
    } catch {
      setIsFailed(true);
    } finally {
      setLoading(false);
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
      projectData.title.trim().length < 1 ||
      projectData.detail.trim().length < 10 ||
      !isChanged,
    loading,
  };
};

export default useEditProject;
