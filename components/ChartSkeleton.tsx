import styles from "./ChartSkeleton.module.css";

export default function ChartSkeleton() {
  return (
    <div className={styles.bgCard}>
      <div className={styles.skeleton} style={{ height: "1.5rem", width: "33.33%" }} />
      <div className={styles.flexCenter}>
        <div className={styles.skeleton} style={{ width: "8rem", height: "8rem", borderRadius: "50%" }} />
      </div>
      <div className={styles.spaceY2}>
        <div className={styles.skeleton} style={{ height: "1rem", width: "100%" }} />
        <div className={styles.skeleton} style={{ height: "1rem", width: "75%" }} />
      </div>
    </div>
  );
}