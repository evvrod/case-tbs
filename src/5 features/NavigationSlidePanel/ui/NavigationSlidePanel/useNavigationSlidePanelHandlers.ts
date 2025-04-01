import { SlideType } from '@prisma/client';

interface INavigationSlidePanelProps {
  slideId: number;
  isCompleted?: boolean;
  slideType: SlideType;
}

export function useNavigationSlidePanelHandlers(
  props: INavigationSlidePanelProps,
) {
  const { slideId, slideType, isCompleted } = props;

  const currentSlide = slideId;
  const prevSlide = currentSlide > 1 ? currentSlide - 1 : 1;
  const nextSlide = currentSlide + 1;

  const isTaskSlide = slideType === 'TASK';
  const isCompleteTask = isCompleted;

  return { prevSlide, nextSlide, currentSlide, isTaskSlide, isCompleteTask };
}
