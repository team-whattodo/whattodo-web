import HomeContent from "@/components/HomeContent";
import styles from "./page.module.css";
import WATODO from '@/app/assets/WATODO.svg';
import Image from "next/image";


const Home = () => {
  return (
    <div className={styles.container}>
      <Image src={WATODO} alt="watodo logo" width={128} height={128}/>
      <p className={styles.title}>WATODO</p>
      <p className={styles.subTitle}>팀 프로젝트의 빠르고 체계적인 진행을 위해 일정 관리와 개발을 한번에!</p>
      <HomeContent />
    </div>
  );
};

export default Home;
