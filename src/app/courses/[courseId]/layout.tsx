'use client';

import { useState } from 'react';
import { getCourseById } from '@/lib/courses';
import { notFound, useParams } from 'next/navigation';
import { LessonSidebar } from '@/components/courses/LessonSidebar';
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse gap-8 py-8 md:flex-row">
          <aside className="w-full md:w-80 lg:w-96 md:flex-shrink-0">
            <LessonSidebar course={course} />
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <FloatingAssistant
        course={course}
        isOpen={isAssistantOpen}
        onOpenChange={setAssistantOpen}
      />
    </>
  );
}
