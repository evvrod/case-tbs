import { notFound } from 'next/navigation';

import Slide from '@/4 widgets/Slide/index';

const MAX_SLIDE = 10;

interface LayoutProps {
  params: { id: string };
}

export default async function Layout({ params }: LayoutProps) {
  const { id } = await params;
  const currentSlide = Number(id);

  if (isNaN(currentSlide) || currentSlide < 1 || currentSlide > MAX_SLIDE) {
    notFound();
  }

  return <Slide currentSlide={currentSlide}>Slide content</Slide>;
}
