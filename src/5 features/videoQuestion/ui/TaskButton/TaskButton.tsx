import styles from './TaskButton.module.css';

interface ITaskButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

export function TaskButton(props: ITaskButtonProps) {
  const { children, onClick, type = 'button' } = props;
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
