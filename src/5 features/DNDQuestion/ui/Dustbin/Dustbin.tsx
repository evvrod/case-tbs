'use client';

import { Box } from '../Box/Box';
import { memo } from 'react';
import { useDrop } from 'react-dnd';

import styles from './Dustbin.module.css';

export interface IDustbinProps {
  type: string;
  items: { id: number; name: string; type: string }[];
  onDrop: (item: any) => void;
  isInitDustbin: boolean;
}

export const Dustbin = memo(function Dustbin({
  type,
  items,
  onDrop,
  isInitDustbin,
}: IDustbinProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [type],
    drop: (item) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let className = styles.dustbin;

  if (isInitDustbin) {
    className = styles.initDustbin;
  }

  if (isActive) className = `${styles.dustbin} ${styles.active}`;
  else if (!isInitDustbin && canDrop)
    className = `${styles.dustbin} ${styles.canDrop}`;

  return (
    <div ref={drop} className={className}>
      {items.map((item) => (
        <Box key={item.id} id={item.id} name={item.name} type={item.type} />
      ))}
    </div>
  );
});
