'use client';

import { getCourseById } from '@/lib/courses';
import { notFound, useParams } from 'next/navigation';
import { LessonSidebar } from '@/components/courses/LessonSidebar';

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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 py-8 md:flex-row">
        <aside className="w-full md:w-64 lg:w-72 md:flex-shrink-0">
          <LessonSidebar course={course} />
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
