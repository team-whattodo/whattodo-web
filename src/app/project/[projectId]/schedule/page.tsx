"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsLightning } from 'react-icons/bs';
import MakeSprint from '@/components/MakeSprint';
import MakeWbs from '@/components/MakeWbs';
import { useParams, useRouter } from 'next/navigation';
import useGetProject from '@/hooks/project/useGetProject';
import { ProjectDetail } from '@/types/project/projectDetail';

const MakeSchedulePage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);
  const getProject = useGetProject(loading, setLoading);
  const [isSprint, setIsSprint] = useState(true);
  const router = useRouter();

  const fetchProject = async () => {
    const project: ProjectDetail = await getProject(projectId);
    if (project.sprint !== null || project.wbs !== null) {
      router.push(`/project/${projectId}`);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.formTitle}>일정 생성하기</p>
        <div className={styles.selectBoxWrap}>
          <div
            className={`${styles.selectBox} ${isSprint && styles.selected}`}
            onClick={() => setIsSprint(true)}
          >
            <BsLightning size={36} />
            <p className={styles.typeTitle}>스프린트</p>
            <p className={styles.typeDetail}>
              일정을 짧게 끊어서 개발할 때 유용해요
            </p>
          </div>
          <div
            className={`${styles.selectBox} ${!isSprint && styles.selected}`}
            onClick={() => setIsSprint(false)}
          >
            <IoCalendarOutline size={36} />
            <p className={styles.typeTitle}>WBS</p>
            <p className={styles.typeDetail}>
              완전히 일정을 짜두고 개발할 때 유용해요
            </p>
          </div>
        </div>
        {
          isSprint ? <MakeSprint projectId={projectId} /> : <MakeWbs projectId={projectId} />
        }
      </div>
    </div>
  );
}

export default MakeSchedulePage