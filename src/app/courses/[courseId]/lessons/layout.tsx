'use client';

import { getCourseById } from '@/lib/courses';
import { notFound, useParams } from 'next/navigation';
import { FloatingAssistant } from '@/components/courses/FloatingAssistant';
import { AssistantProvider } from '@/context/AssistantContext';

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  // O AssistantProvider envolve os filhos e o FloatingAssistant,
  // permitindo que eles compartilhem o estado aberto/fechado do assistente.
  return (
    <AssistantProvider>
      {children}
      <FloatingAssistant course={course} />
    </AssistantProvider>
  );
}
