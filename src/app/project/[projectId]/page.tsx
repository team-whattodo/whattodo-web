"use client";
import Spinner from "@/components/Spinner";
import useGetProject from "@/hooks/project/useGetProject";
import { ProjectDetail } from "@/types/project/projectDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./project.module.css";
import WbsContent from "@/components/Wbs";
import SprintContent from "@/components/SprintContent";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
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

  if (project.sprint === null && project.wbs === null) {
    return (
      <div className={styles.container}>
        <p className={styles.projectTitle}>{project?.title} 프로젝트</p>
        <p className={styles.projectDetail}>"{project.detail}"</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.projectInfoWrap}>
        <p className={styles.projectTitle}>{project?.title} 프로젝트</p>
        <p className={styles.projectDetail}>"{project.detail}"</p>
      </div>
      <div className={styles.projectLayout}>
        {project.wbs !== null ? (
          <WbsContent data={project.wbs} />
        ) : (
          project.sprint !== null && <SprintContent data={project.sprint} />
        )}
        <div className={styles.projectSideBar}></div>
      </div>
    </div>
  );
};

export default ProjectPage;
