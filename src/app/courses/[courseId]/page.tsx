"use client";

import { getCourseById } from '@/lib/courses';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '@/context/EnrollmentContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, BarChart } from 'lucide-react';
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
                <Users className="h-4 w-4" />
                <span>Taught by <span className="font-semibold text-foreground">{course.instructor.name}</span></span>
            </div>
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
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{course.instructor.name}</h3>
                    <p className="text-muted-foreground">{course.instructor.title}</p>
                </div>
            </div>
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
    </article>
  );
}
