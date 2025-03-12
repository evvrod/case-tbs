import { notFound } from 'next/navigation';

import { SlideContent } from '@/4 widgets/Slide/index';

import { VideoQuestion } from '@/5 features/videoQuestion/index';

import { getSlide } from '@/6 entities/Slide/index';
import { getTaskProgressOrCreate } from '@/6 entities/TaskProgress/index';

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: IPageProps) {
  const { id } = await props.params;

  const currentSlide = Number(id);

  const slide = await getSlide(currentSlide);

  if (slide.error || !slide.data) notFound();

  if (slide.data.type === 'TASK' && slide.data.task) {
    const taskProgress = await getTaskProgressOrCreate({
      userId: '94043265-ff18-4f41-899f-bf206c277d3f',
      taskId: slide.data.task.id,
    });

    if (taskProgress.error || !taskProgress.data) notFound();

    return (
      <SlideContent
        slideId={slide.data.id}
        isCompleted={taskProgress.data.status === 'COMPLETED'}
        slideType={slide.data.type}
      >
        {slide.data.task.videoQuestion && (
          <VideoQuestion slide={slide.data} taskProgress={taskProgress.data} />
        )}
      </SlideContent>
    );
  }

  if (slide.data.type === 'INF' || slide.data.type === 'NAV') {
    return (
      <SlideContent slideId={slide.data.id} slideType={slide.data.type}>
        <div>!!!</div>
      </SlideContent>
    );
  }

  return notFound();
}
