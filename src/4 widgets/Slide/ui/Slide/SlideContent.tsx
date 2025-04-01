import { SlideType } from '@prisma/client';
import NavigationPanel from '@/5 features/NavigationSlidePanel/index';

import styles from './SlideContent.module.css';

interface ISlideContentProps {
  children: React.ReactNode;
  slideId: number;
  isCompleted?: boolean;
  slideType: SlideType;
}

export function SlideContent(props: ISlideContentProps) {
  const { children, slideId, slideType, isCompleted } = props;

  return (
    <div className={styles.slide}>
      <div className={styles.main}>{children}</div>
      <div className={styles.footer}>
        <NavigationPanel
          slideId={slideId}
          slideType={slideType}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}
