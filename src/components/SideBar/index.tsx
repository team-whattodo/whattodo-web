"use client";

import { useUserStore } from "@/store/useUserStore";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import useGetMe from "@/hooks/user/useGetMe";
import { useEffect, useState } from "react";
import { User } from "@/types/user/user";
import { SlDrawer } from "react-icons/sl";
import Skeleton from "../Skeleton";

const Sidebar = () => {
  const getMe = useGetMe();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const fetchUser = async () => {
    if (loading || user?.id) {
      return;
    }
    setLoading(true);
    const data: User = await getMe();
    if (JSON.stringify(data) !== JSON.stringify(user)) {
      setUser(data);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <SlDrawer size={24} />
        <p className={styles.title}>내 프로젝트</p>
      </div>

      <div className={styles.projectWrap}>
        {!user || loading ? (
          <>
            <Skeleton width="100%" height="5.2rem" borderRadius="0.4rem" />
            <Skeleton width="100%" height="5.2rem" borderRadius="0.4rem" />
            <Skeleton width="100%" height="5.2rem" borderRadius="0.4rem" />
          </>
        ) : (
          user.projects.map((project) => (
            <div
              className={styles.projectItem}
              key={project.id}
              onClick={() => router.push(`/project/${project.id}`)}
            >
              <p className={styles.projectTitle}>{project.title}</p>
            </div>
          ))
        )}
        <div className={styles.projectButtonWrap}>
          <div
            className={styles.projectButton}
            onClick={() => router.push("/project")}
          >
            새 프로젝트
          </div>
          <div
            className={styles.projectButton}
            onClick={() => router.push("/project/join")}
          >
            프로젝트 참가
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Sidebar;
