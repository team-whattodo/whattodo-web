"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import useGetMe from "@/hooks/user/useGetMe";
import { User } from "@/types/user/user";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const HomeContent = () => {
  const [loading, setLoading] = useState(false);
  const getMe = useGetMe();
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const fetchUser = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const user: User = await getMe();
    setUser(user);
    setTimeout(() => {
      if (user.projects.length > 0) {
        const recentProject = localStorage.getItem('RECENT_PROJECT');
        router.push(`/project/${recentProject || user.projects[0].id}`);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user || loading) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => router.push("/project")}>
        프로젝트 만들기
      </button>
      <button className={`${styles.button} ${styles.join}`} onClick={() => router.push("/project/join")}>
        프로젝트 참가하기
      </button>
    </div>
  );
};

export default HomeContent;
