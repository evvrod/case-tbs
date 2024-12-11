import NavigationPanel from '@/5 features/NavigationSlidePanel/index';
import styles from './SlideFooter.module.css';

interface SlideFooterProps {
  currentSlide: number;
}

export default function SlideFooter(props: SlideFooterProps) {
  const { currentSlide } = props;
  return (
    <div className={styles.footer}>
      <NavigationPanel currentSlide={currentSlide} />
    </div>
  );
}
