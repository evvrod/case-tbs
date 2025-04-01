'use client';

import Link from 'next/link';
import NavButton from '../NavButton/NavButton';

import { useNavigationSlidePanelHandlers } from './useNavigationSlidePanelHandlers';

import styles from './NavigationSlidePanel.module.css';
import { SlideType } from '@prisma/client';

interface INavigationSlidePanelProps{
  slideId: number;
  isCompleted?: boolean;
  slideType: SlideType;
}

export function NavigationSlidePanel(props: INavigationSlidePanelProps) {
  const { prevSlide, nextSlide, currentSlide, isTaskSlide, isCompleteTask } =
    useNavigationSlidePanelHandlers(props);

  return (
    <div className={styles.navigation}>
      <Link href={`/slide/${prevSlide}`}>
        <NavButton type={'PREV'} />
      </Link>
      <span className={styles.currentSlide}>Slide {currentSlide}</span>

      <Link
        href={`/slide/${nextSlide}`}
        style={{
          visibility: isTaskSlide && !isCompleteTask ? 'hidden' : 'visible',
        }}
      >
        <NavButton type="NEXT" />
      </Link>
    </div>
  );
}
