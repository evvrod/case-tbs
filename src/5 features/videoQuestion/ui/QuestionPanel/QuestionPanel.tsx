import { useState, useEffect } from 'react';

import verno from '@/assets/icons/VERNO.png';
import neverno from '@/assets/icons/NEVERNO.png';

import styles from './QuestionPanel.module.css';

interface IQuestionPanelProps {
  title: string;
  question: string;
  options: string[];
  correctOption: number | null;
  selectedOption: number | null;
  isCompleted: boolean;
  onSelect: (num: number) => void;
}

export function QuestionPanel(props: IQuestionPanelProps) {
  const {
    title,
    question,
    options,
    correctOption,
    selectedOption,
    isCompleted,
    onSelect,
  } = props;

  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    setIsInteractive(true);
  }, []);

  return (
    <div className={styles.questionPanel}>
      <div className={styles.title}>{title}</div>
      <div className={styles.question}>{question}</div>
      <div className={styles.vars}>
        {options.map((option, index) => {
          const optionIndex = index + 1;
          const isCorrect = correctOption === optionIndex;
          const imgSrc = isCompleted
            ? isCorrect
              ? `url(${verno.src})`
              : `url(${neverno.src})`
            : '';
          return (
            <div
              key={optionIndex}
              className={styles.var}
              style={{ '--img-url': imgSrc } as React.CSSProperties}
            >
              <input
                type="radio"
                id={`var${optionIndex}`}
                name="vars"
                checked={selectedOption === optionIndex}
                disabled={isCompleted || !isInteractive}
                onChange={() => onSelect(optionIndex)}
              />
              <label htmlFor={`var${optionIndex}`}>{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
