import styles from './not-found.module.css';

export default function Page() {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <p className={styles.code}>404</p>
        <span> | </span>
        <pattern>This page could not be found.</pattern>
      </div>
    </div>
  );
}
