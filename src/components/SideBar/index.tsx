"use client";

import { useUserStore } from "@/store/useUserStore";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import useGetMe from "@/hooks/user/useGetMe";
import { useEffect } from "react";
import { User } from "@/types/user/user";

const Sidebar = () => {
  const getMe = useGetMe();
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const fetchUser = async () => {
    const data: User = await getMe();
    if (JSON.stringify(data) !== JSON.stringify(user)) {
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>내 프로젝트</p>
      <div className={styles.projectWrap}>
        {user?.projects.map((project) => (
          <div className={styles.projectItem} key={project.id}>
            <p
              className={styles.projectTitle}
              onClick={() => router.push(`/project/${project.id}`)}
            >
              {project.title}
            </p>
          </div>
        ))}
        <div className={styles.makeProjectButton}>+</div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Sidebar;
