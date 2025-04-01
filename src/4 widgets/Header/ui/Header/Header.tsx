import { Menu } from '../Menu/Menu';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          How different is different? Making a Sales Pitch: A Case of TBS
          Software
        </h1>
        <Menu />
      </div>
    </header>
  );
}
