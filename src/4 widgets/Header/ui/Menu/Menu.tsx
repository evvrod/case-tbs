import { Link } from '@/7 shared/index';

import styles from './Menu.module.css';

export function Menu() {
  return (
    <div className={styles.menu}>
      <Link href="/signin" target="_self" className={styles.signin}>
        Sing In
      </Link>
      <span>|</span>
      <Link href="/signup" target="_self" className={styles.signup}>
        Sing Up
      </Link>
    </div>
  );
}
