import React from "react";
import styles from "./layout.module.css";
import SideBar from "@/components/SideBar";

const ProjectLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.contentWrap}>{children}</div>
    </div>
  );
};

export default ProjectLayout;
