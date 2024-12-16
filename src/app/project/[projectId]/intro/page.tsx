"use client";
import { useEffect, useState } from 'react';
import useGetMe from '@/hooks/user/useGetMe';
import { useUserStore } from '@/store/useUserStore';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@/types/user/user';
import styles from './page.module.css';
import Image from 'next/image';
import Check from '@/app/assets/check.svg'
import { API_URL } from '@/constants/api';
import { FaArrowRightLong } from 'react-icons/fa6';

const ProjectIntro = () => {
  const getMe = useGetMe();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();  

  const fetchUser = async () => {
    if (loading) {
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
      <Image src={Check} alt="created" width={100} height={100} />
      <p className={styles.title}>프로젝트가 성공적으로 생성되었습니다!</p>
      <p className={styles.subTitle}>
        왓투두 사용을 위해 아래 엔드포인트를
        <br />
        깃허브 레포지토리의 웹훅에 추가해주세요.
      </p>
      <input
        type="text"
        className={styles.input}
        readOnly
        value={`${API_URL}/github/watodo-webhook`}
      />
      <button
        className={styles.button}
        onClick={() => router.push(`/project/${projectId}`)}
      >
        <FaArrowRightLong size={32} />
      </button>
    </div>
  );
}

export default ProjectIntro