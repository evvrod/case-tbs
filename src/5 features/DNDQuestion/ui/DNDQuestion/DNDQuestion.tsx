// 'use client';

// import { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// import { submitAnswer } from '../../lib/submitAnswer';

// const ITEM_TYPE = 'ITEM';

// interface DraggableItemProps {
//   item: string;
// }

// interface DropAreaProps {
//   items: string[];
//   onDrop: (item: string) => void;
//   title: string;
// }

// function DraggableItem({ item }: DraggableItemProps) {
//   const [, drag] = useDrag(() => ({
//     type: ITEM_TYPE,
//     item: { item },
//   }));

//   return (
//     <div
//       ref={drag}
//       style={{ padding: '10px', border: '1px solid black', margin: '5px' }}
//     >
//       {item}
//     </div>
//   );
// }

// function DropArea({ items, onDrop, title }: DropAreaProps) {
//   const [, drop] = useDrop(() => ({
//     accept: ITEM_TYPE,
//     drop: (draggedItem: { item: string }) => onDrop(draggedItem.item),
//     canDrop: () => true,
//   }));

//   return (
//     <div
//       ref={drop}
//       style={{
//         padding: '20px',
//         border: '2px dashed black',
//         'width': '150px',
//         'height': '150px',
//         'backgroundColor': 'lightgray',
//       }}
//     >
//       {items.map((item, i) => (
//         <div
//           key={i}
//           style={{
//             padding: '10px',
//             border: '1px solid black',
//             margin: '5px',
//           }}
//         >
//           {item}
//         </div>
//       ))}
//     </div>
//   );
// }

// interface AreasState {
//   area1: string[];
//   area2: string[];
// }

// export function DNDQuestion() {
//   const [areas, setAreas] = useState<AreasState>({
//     area1: [],
//     area2: [],
//   });

//   const [availableItems, setAvailableItems] = useState<string[]>([
//     'Item 1',
//     'Item 2',
//     'Item 3',
//     'Item 4',
//   ]);

//   function handleDrop(item: string, targetArea: keyof AreasState) {
//     setAreas((prev) => {
//       const newAreas = { ...prev };

//       // Удаляем элемент из всех областей
//       (Object.keys(newAreas) as Array<keyof AreasState>).forEach((area) => {
//         newAreas[area] = newAreas[area].filter((el) => el !== item);
//       });

//       // Добавляем в целевую область
//       newAreas[targetArea].push(item);

//       return newAreas;
//     });

//     // Удаляем из доступных для перетаскивания
//     setAvailableItems((prev) => prev.filter((el) => el !== item));
//   }

//   async function handleSubmit() {
//     try {
//       // const response = await axios.post('/api/submit', areas);
//       console.log('Sent to server:', response.data);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   }

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <h2>Drag and Drop Component</h2>

//         <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//           {availableItems.map((item, i) => (
//             <DraggableItem key={i} item={item} />
//           ))}
//         </div>

//         <div style={{ display: 'flex', gap: '20px' }}>
//           <DropArea
//             items={areas.area1}
//             onDrop={(item) => handleDrop(item, 'area1')}
//             title="Область 1"
//           />
//           <DropArea
//             items={areas.area2}
//             onDrop={(item) => handleDrop(item, 'area2')}
//             title="Область 2"
//           />
//         </div>

//         <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
//           Submit
//         </button>
//       </div>
//     </DndProvider>
//   );
// }
'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskProgress } from '@prisma/client';

import { SlideWithRelations } from '@/6 entities/Slide';
import { Dustbin } from '../Dustbin/Dustbin';
import { InfoPanel } from '../InfoPanel/InfoPanel';
import {SubmitPanel} from '../SubmitPanel/SubmitPanel';

import { useDNDQuestionHandlers } from './useDNDQuestionHandlers';
import styles from './DNDQuestion.module.css';

interface IVideoQuestionProps {
  slide: SlideWithRelations;
  taskProgress: TaskProgress;
}

export function DNDQuestion(props: IVideoQuestionProps) {
  const {
    dustbins,
    handleDrop,
    handleSubmit,
    handleReset,
    isFeedbackVisible,
    attempt,
    remainingAttempts,
    isSuccess,
    isCompleted,
  } = useDNDQuestionHandlers(props);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <div className={styles.dustbins}>
            <Dustbin
              type={dustbins[0].type}
              items={dustbins[0].items}
              onDrop={(item) => handleDrop(0, item)}
              isInitDustbin={true}
            />

            {dustbins.slice(1).map(({ type, items }, index) => (
              <Dustbin
                type={type}
                items={items}
                onDrop={(item) => handleDrop(index + 1, item)}
                key={index + 1}
                isInitDustbin={false}
              />
            ))}
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </DndProvider>
      <InfoPanel
        isFeedbackVisible={isFeedbackVisible}
        isSuccess={isSuccess}
        attempt={attempt}
        remainingAttempts={remainingAttempts}
      />
      {!isCompleted && <SubmitPanel onClickReset={handleReset} />}
    </>
  );
}
