import { TaskButton } from '../TaskButton/TaskButton';

import styles from './SubmitPanel.module.css';

interface ISubmitPanelProps {
  onClickReset: () => void;
}

export function SubmitPanel(props: ISubmitPanelProps) {
  const { onClickReset } = props;

  return (
    <div className={styles.submitPanel}>
      <TaskButton type="submit">Submit</TaskButton>
      <div className={styles.line}></div>
      <TaskButton type="button" onClick={onClickReset}>
        Reset
      </TaskButton>
    </div>
  );
}
