import Link from 'next/link';
import NavButton from '../NavButton/NavButton';

import styles from './NavigationSlidePanel.module.css';

interface INavigationSlidePanelProps {
  currentSlide: number;
}

export function NavigationSlidePanel(props: INavigationSlidePanelProps) {
  const { currentSlide } = props;

  const prevSlide = currentSlide > 1 ? currentSlide - 1 : 1;
  const nextSlide = currentSlide + 1;

  return (
    <div className={styles.navigation}>
      <Link href={`/slide/${prevSlide}`}>
        <NavButton type={'PREV'} />
      </Link>
      <span className={styles.currentSlide}>Slide {currentSlide}</span>
      <Link href={`/slide/${nextSlide}`}>
        <NavButton type={'NEXT'} />
      </Link>
    </div>
  );
}
