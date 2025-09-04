import styles from "./CardSkeleton.module.css";

export default function CardSkeleton() {
  return (
    <div className={styles.bgCard}>
      <div className={styles.skeleton} style={{ height: "1rem", width: "25%" }} />
      <div className={styles.skeleton} style={{ height: "2rem", width: "100%" }} />
      <div className={styles.spaceY2}>
        <div className={styles.skeleton} style={{ height: "0.75rem", width: "100%" }} />
        <div className={styles.skeleton} style={{ height: "0.75rem", width: "66.67%" }} />
      </div>
    </div>
  );
}