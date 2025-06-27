"use client";

import { useEnrollment } from '@/context/EnrollmentContext';
import { courses } from '@/lib/courses';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MyCoursesPage() {
  const { enrolledCourses } = useEnrollment();

  const myCourses = courses.filter(course => enrolledCourses.has(course.id));

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">My Learning</h1>
        <p className="mt-4 text-lg text-muted-foreground">Continue your journey and master new skills.</p>
      </div>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center rounded-lg border-2 border-dashed border-border p-12">
            <h3 className="text-lg font-medium text-foreground">No Courses Yet</h3>
          <p className="mt-2 text-muted-foreground">You haven't enrolled in any courses. Explore our catalog to get started!</p>
          <Button asChild className="mt-6">
            <Link href="/courses">
              Explore Courses
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
