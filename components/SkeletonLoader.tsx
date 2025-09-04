import { cn } from '@/lib/utils';
import styles from './SkeletonLoader.module.css';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn(styles.skeleton, className)} />
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton className={styles.skeletonH4} />
      <Skeleton className={styles.skeletonH8} />
      <div className={styles.activityContent}>
        <Skeleton className={styles.skeletonH3} />
        <Skeleton className={styles.skeletonH3TwoThirds} />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton className={styles.skeletonH6} />
      <div className={styles.activityContent}>
        <Skeleton className={styles.skeletonW32H32} />
      </div>
      <div className={styles.activityContent}>
        <Skeleton className={styles.skeletonH4Full} />
        <Skeleton className={styles.skeletonH4ThreeFourths} />
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className={styles.activitySkeleton}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.activityItem}>
          <Skeleton className={styles.skeletonW8H8} />
          <div className={styles.activityContent}>
            <Skeleton className={styles.skeletonH4Half} />
            <Skeleton className={styles.skeletonH3Quarter} />
          </div>
        </div>
      ))}
    </div>
  );
}