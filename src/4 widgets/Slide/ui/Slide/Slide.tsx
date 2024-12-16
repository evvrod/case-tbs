import SlideFooter from '../SlideFooter/SlideFooter';
import SlideMain from '../SlideMain//SlideMain';
import styles from './Slide.module.css';

interface SlideProps {
  currentSlide: number;
  children: React.ReactNode;
}

export function Slide(props: SlideProps) {
  const { currentSlide, children } = props;
  return (
    <div className={styles.slide}>
      <SlideMain currentSlide={currentSlide}>{children}</SlideMain>
      <SlideFooter currentSlide={currentSlide} />
    </div>
  );
}
