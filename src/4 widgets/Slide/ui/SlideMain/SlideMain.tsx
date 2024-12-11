import styles from './SlideMain.module.css';

interface SlideMainProps {
  currentSlide: number;
  children: React.ReactNode;
}

export default function SlideMain(props: SlideMainProps) {
  const { children } = props;
  return <div className={styles.main}>{children}</div>;
}
