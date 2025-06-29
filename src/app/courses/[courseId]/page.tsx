"use client";

import { getCourseById } from '@/lib/courses';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '@/context/EnrollmentContext';
import { Clock, BarChart, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);
  const { enrollCourse, isEnrolled } = useEnrollment();
  const router = useRouter();

  if (!course) {
    notFound();
  }

  const enrolled = isEnrolled(course.id);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((acc, module) => acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0), 0);

  const handleEnroll = () => {
    enrollCourse(course);
  };
  
  const handleContinue = () => {
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      router.push(`/courses/${course.id}/lessons/${firstLesson.id}`);
    }
  };

  return (
    <article className="rounded-lg bg-card text-card-foreground shadow-sm border overflow-hidden">
      <div className="p-6 md:p-8">
        <Badge variant="secondary" className="mb-4">{course.category}</Badge>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{course.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{course.longDescription}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Approx. {Math.round(totalDuration / 60)} hours</span>
            </div>
            <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>{totalLessons} lessons</span>
            </div>
        </div>
      </div>
      
      <div className="bg-muted/50 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Ferramentas Utilizadas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="px-3 py-1 text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              {enrolled ? (
              <Button size="lg" onClick={handleContinue}>
                Continue Learning
              </Button>
              ) : (
              <Button size="lg" onClick={handleEnroll}>
                Enroll Now for Free
              </Button>
              )}
            </div>
        </div>
      </div>
    </article>
  );
}
