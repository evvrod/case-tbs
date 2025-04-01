import Link from 'next/link';

import styles from './Link.module.css';

interface MyLinkProps {
  children: React.ReactNode;
  target?: string;
  href: string;
  className?: string;
}

export function MyLink(props: MyLinkProps) {
  const { target = '_blank', href, className, children } = props;
  return (
    <Link
      target={target}
      href={href}
      className={`${className} ${styles.link}`}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
