import React from "react";
import styles from "./style.module.css"; 

const Skeleton = ({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  style,
} : {
  width: string;
  height: string;
  borderRadius: string;
  style?: CSSStyleSheet
}) => {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;
