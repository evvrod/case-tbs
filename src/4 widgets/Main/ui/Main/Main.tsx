import styles from './Main.module.css';

interface IMainProps {
  children: React.ReactNode;
}

export function Main(props: IMainProps) {
  const { children } = props;

  return (
    <main className={styles.main}>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
