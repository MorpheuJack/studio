'use client';

import { getCourseById } from '@/lib/courses';
import { notFound, useParams } from 'next/navigation';
import { FloatingAssistant } from '@/components/courses/FloatingAssistant';
import { AssistantProvider } from '@/context/AssistantContext';
import { useAuth } from '@/context/AuthContext';

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);
  const { isAuthenticated } = useAuth();

  if (!course) {
    notFound();
  }

  // The AssistantProvider surrounds the children and the FloatingAssistant,
  // allowing them to share the open/closed state of the assistant.
  return (
    <AssistantProvider>
      {children}
      {isAuthenticated && <FloatingAssistant course={course} />}
    </AssistantProvider>
  );
}
