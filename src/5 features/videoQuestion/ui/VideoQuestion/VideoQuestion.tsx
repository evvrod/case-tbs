'use client';

import { getImageProps } from 'next/image';
import { TaskProgress } from '@prisma/client';

import { InfoPanel } from '../InfoPanel/InfoPanel';
import { QuestionPanel } from '../QuestionPanel/QuestionPanel';
import { SubmitPanel } from '../SubmitPanel/SubmitPanel';
import bg from '@/assets/backgrounds/012 sld.jpeg';

import { SlideWithRelations } from '@/6 entities/Slide';

import { useVideoQuestionHandlers } from './useVideoQuestionHandlers';
import styles from './VideoQuestion.module.css';

interface IVideoQuestionProps {
  slide: SlideWithRelations;
  taskProgress: TaskProgress;
}

export function VideoQuestion(props: IVideoQuestionProps) {
  const { srcSet } = getImageProps({ alt: '', src: bg }).props;

  const {
    getBackgroundImage,
    videoQuestion,
    remainingAttempts,
    handleSubmit,
    handleReset,
    selectedOption,
    correctOption,
    handleSelectOption,
    isSuccess,
    isFeedbackVisible,
    attempt,
    isCompleted,
    isError,
  } = useVideoQuestionHandlers(props);

  return (
    <div className={styles.content} style={getBackgroundImage(srcSet)}>
      {!isError && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <QuestionPanel
            title={videoQuestion.title}
            question={videoQuestion.question}
            options={videoQuestion.options}
            correctOption={correctOption}
            selectedOption={selectedOption}
            isCompleted={isCompleted}
            onSelect={(option) => handleSelectOption(option)}
          />
          <InfoPanel
            isFeedbackVisible={isFeedbackVisible}
            isSuccess={isSuccess}
            attempt={attempt}
            remainingAttempts={remainingAttempts}
          />
          {!isCompleted && <SubmitPanel onClickReset={handleReset} />}
        </form>
      )}
      {isError && (
        <div className={styles.error}>
          Ошибка при отправке ответа. Перезагрузите страницу
        </div>
      )}
    </div>
  );
}
