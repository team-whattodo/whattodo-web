"use client";
import useGetProject from "@/hooks/project/useGetProject";
import { ProjectDetail } from "@/types/project/projectDetail";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";

const ProjectContent = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const getProject = useGetProject(loading, setLoading);
  const [project, setProject] = useState<ProjectDetail>();

  const fetchProject = async () => {
    const project = await getProject(projectId);
    if (project) {
      setProject(project);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (!project) {
    return <Spinner />;
  }

  return <div>{project?.title}</div>;
};

export default ProjectContent;
