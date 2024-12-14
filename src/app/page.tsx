import HomeContent from "@/components/HomeContent";
import styles from "./page.module.css";


const Home = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>왓투두</p>
      <HomeContent />
    </div>
  );
};

export default Home;
