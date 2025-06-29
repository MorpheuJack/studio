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

  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
      <FloatingAssistant
        course={course}
        isOpen={isAssistantOpen}
        onOpenChange={setAssistantOpen}
      />
    </>
  );
}
