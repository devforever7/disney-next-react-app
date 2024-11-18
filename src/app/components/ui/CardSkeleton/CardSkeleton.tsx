import styles from './CardSkeleton.module.css';

export const CardSkeleton = () => (
  <div className={styles.cardSkeleton}>
    <div className={styles.imageSkeleton} />
    <div className={styles.contentSkeleton}>
      <div className={styles.titleSkeleton} />
      <div className={styles.descriptionSkeleton} />
      <div className={styles.linkSkeleton} />
    </div>
  </div>
);

interface ICardGridSkeletonProps {
  count?: number;
}

export const CardGridSkeleton = ({ count = 8 }: ICardGridSkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={styles.gridSkeleton}>
      {skeletons.map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
