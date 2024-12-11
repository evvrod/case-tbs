import Image from 'next/image';
import { Link } from '@/7 shared/index';
import imgGitHub from '@/assets/icons/github.svg';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link
          href="https://github.com/evvrod/case-tbs"
        >
          <Image
            src={imgGitHub}
            alt="github logo"
            className={styles['git-hub']}
          />
        </Link>
        <span>© 2024</span>
        <Link
          href="https://github.com/evvrod"
        >
          evvrod
        </Link>
      </div>
    </footer>
  );
}
