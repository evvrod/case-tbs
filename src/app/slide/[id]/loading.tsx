import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.slide}>
      <div className={styles.main}></div>
      <div className={styles.footer}>
      </div>
    </div>
  );
}
