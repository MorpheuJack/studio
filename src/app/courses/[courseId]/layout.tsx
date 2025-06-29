'use client';

import { getCourseById } from '@/lib/courses';
import { notFound, useParams } from 'next/navigation';
import { FloatingAssistant } from '@/components/courses/FloatingAssistant';
import { AssistantProvider } from '@/context/AssistantContext';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  // The AssistantProvider wraps the children and the FloatingAssistant,
  // allowing them to share the assistant's open/closed state.
  return (
    <AssistantProvider>
      {children}
      <FloatingAssistant course={course} />
    </AssistantProvider>
  );
}
