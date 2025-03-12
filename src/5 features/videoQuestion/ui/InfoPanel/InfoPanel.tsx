import Image from 'next/image';
import manager from '@/assets/images/Manager_blue.png';

import styles from './InfoPanel.module.css';

interface IInfoPanelProps {
  isSuccess: boolean;
  isFeedbackVisible: boolean;
  remainingAttempts: number;
  attempt: number;
}

export function InfoPanel(props: IInfoPanelProps) {
  const { attempt, isSuccess, isFeedbackVisible, remainingAttempts } = props;

  return (
    <div className={styles.infoPanel}>
      <div className={styles.person}>
        <Image width={300} height={300} src={manager} alt="" />
        {isFeedbackVisible && isSuccess && (
          <div className={styles.success}>Well done!</div>
        )}
        {isFeedbackVisible && !isSuccess && (
          <div className={styles.fail}>Fail</div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.text}>You have</p>
        <p className={styles.attemptText}>
          {`${remainingAttempts} / ${attempt} ATTEMPT`}
        </p>
      </div>
    </div>
  );
}
