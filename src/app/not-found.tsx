import { cookies } from 'next/headers';

import styles from './not-found.module.css';

export default async function NotFound() {
  const currentUrl = (await cookies()).get('currentUrl')?.value;

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <p className={styles.code}>404</p>
        <span> | </span>
        <p>This page ${currentUrl} could not be found.</p>
      </div>
    </div>
  );
}
