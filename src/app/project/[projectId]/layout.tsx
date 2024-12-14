import React from "react";
import styles from "./layout.module.css";
import Sidebar from "@/components/Sidebar";

const ProjectLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.contentWrap}>{children}</div>
    </div>
  );
};

export default ProjectLayout;
