import styles from './Button.module.css';

interface IButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
}

export function Button(props: IButtonProps) {
  const { children, type = 'button' } = props;

  return (
    <button type={type} className={styles.button}>
      {children}
    </button>
  );
}
