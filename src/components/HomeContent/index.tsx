"use client";

import React, { useEffect, useState } from "react";
import styles from "./homeContent.module.css";
import useGetMe from "@/hooks/user/useGetMe";
import { User } from "@/types/user/user";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

const HomeContent = () => {
  const [loading, setLoading] = useState(false);
  const getMe = useGetMe();
  const [user, setUser] = useState<User>();
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
        router.push(`/project/${user.projects[0].id}`);
      }
      setLoading(true);
    }, 1000);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user || loading) {
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