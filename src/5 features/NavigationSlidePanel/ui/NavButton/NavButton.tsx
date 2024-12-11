import Image from 'next/image';

import icon from '@/assets/icons/Button_Next.png';

import styles from './NavButton.module.css';

interface NavButtonProps {
  type: 'PREV' | 'NEXT';
}

export default function NavButton(props: NavButtonProps) {
  const { type } = props;

  let buttonStyles;
  if (type === 'PREV') {
    buttonStyles = `${styles.buttonInner} ${styles.rotate}`;
  } else {
    buttonStyles = `${styles.buttonInner}`;
  }

  return (
    <button className={buttonStyles}>
      <Image src={icon} width={40} height={40} alt="Button Icon" />
    </button>
  );
}
