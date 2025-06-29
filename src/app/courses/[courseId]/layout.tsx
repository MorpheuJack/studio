'use client';

import { useState } from 'react';
import { getCourseById } from '@/lib/courses';
import { notFound, useParams } from 'next/navigation';
import { FloatingAssistant } from '@/components/courses/FloatingAssistant';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);
  const [isAssistantOpen, setAssistantOpen] = useState(false);

  if (!course) {
    notFound();
  }

  // Pass children through directly. The individual pages will handle their own containers.
  return (
    <>
      {children}
      <FloatingAssistant
        course={course}
        isOpen={isAssistantOpen}
        onOpenChange={setAssistantOpen}
      />
    </>
  );
}
