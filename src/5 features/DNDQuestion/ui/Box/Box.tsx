'use client';

import { memo } from 'react';
import { useDrag } from 'react-dnd';

import styles from './Box.module.css';

export interface IBoxProps {
  id: number;
  name: string;
  type: string;
}

export const Box = memo(function Box(props: IBoxProps) {
  const { id, name, type } = props;

  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { id, name, type },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, name, type],
  );

  return (
    <div ref={drag} className={styles.box} style={{ opacity }}>
      {name}
    </div>
  );
});
