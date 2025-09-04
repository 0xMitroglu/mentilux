import styles from "./ActivitySkeleton.module.css";

export default function ActivitySkeleton() {
  return (
    <div className={styles.spaceY4}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.flexSpaceX3}>
          <div className={styles.skeleton} style={{ width: "2rem", height: "2rem", borderRadius: "0.25rem" }} />
          <div className={styles.flex1}>
            <div className={styles.skeleton} style={{ height: "1rem", width: "50%" }} />
            <div className={styles.skeleton} style={{ height: "0.75rem", width: "25%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}