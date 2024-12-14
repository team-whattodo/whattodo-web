"use client";

import React, { useEffect, useState } from "react";
import styles from "./homeContent.module.css";
import useGetMe from "@/hooks/user/useGetMe";
import { User } from "@/types/user/user";
import Spinner from "../Spinner";
import useGetMyProject from "@/hooks/user/useGetMyProject";
import { Project } from "@/types/project/project";
import { useRouter } from "next/navigation";

const HomeContent = () => {
  const [loading, setLoading] = useState(false);
  const getMe = useGetMe(loading, setLoading);
  const getMyProject = useGetMyProject(loading, setLoading);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const fetchUser = async () => {
    const user = await getMe();
    if (user) {
      setUser(user);
    }
  };

  const fetchMyProject = async () => {
    const projects: Project[] = await getMyProject();
    if(projects && projects.length > 0) {
      router.push(`/project/${projects[0].id}`);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchMyProject();
      fetchUser();
    }
  }, [loading]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <p>홈 콘텐트</p>
      <p>{user.nickname}</p>
    </div>
  );
};

export default HomeContent;
