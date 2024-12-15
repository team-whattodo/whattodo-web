"use client";
import Spinner from "@/components/Spinner";
import useGetProject from "@/hooks/project/useGetProject";
import { ProjectDetail } from "@/types/project/projectDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import WbsContent from "@/components/Wbs";
import SprintContent from "@/components/SprintContent";
import ProjectSidebar from "@/components/ProjectSidebar";
import Image from "next/image";
import WATODO from '@/app/assets/WATODO.svg';
import { useRouter } from "next/navigation";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);
  const getProject = useGetProject(loading, setLoading);
  const [project, setProject] = useState<ProjectDetail>();
  const router = useRouter();

  const fetchProject = async () => {
    const project = await getProject(projectId);
    if (project) {
      setProject(project);
    }
  };

  useEffect(() => {
    fetchProject();
    localStorage.setItem("RECENT_PROJECT", projectId);
  }, [projectId]);

  if (!project || loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  if (project.sprint === null && project.wbs === null) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.projectInfoWrap}>
            <p className={styles.projectTitle}>{project?.title} 프로젝트</p>
            <p className={styles.projectDetail}>"{project.detail}"</p>
          </div>
          <div className={styles.logoWrap}>
            <p className={styles.logoText}>WATODO</p>
            <Image src={WATODO} alt="watodo logo" width={60} height={60} />
          </div>
        </div>

        <div className={styles.projectLayout}>
          <div className={styles.projectStarterWrap}>
            <p className={styles.starterText}>아직 등록된 일정이 없습니다...</p>
            <button className={styles.button} onClick={() => router.push(`/project/${projectId}/schedule`)}>일정 만들기</button>
          </div>
          <ProjectSidebar project={project} setProject={setProject} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.projectInfoWrap}>
            <p className={styles.projectTitle}>{project?.title} 프로젝트</p>
            <p className={styles.projectDetail}>"{project.detail}"</p>
          </div>
          <div className={styles.logoWrap}>
            <p className={styles.logoText}>WATODO</p>
            <Image src={WATODO} alt="watodo logo" width={60} height={60} />
          </div>
      </div>
      <div className={styles.projectLayout}>
        {project.wbs !== null ? (
          <WbsContent data={project.wbs} />
        ) : (
          project.sprint !== null && <SprintContent data={project.sprint} />
        )}
        <ProjectSidebar project={project} setProject={setProject}/>
      </div>
    </div>
  );
};

export default ProjectPage;
