"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEnrollment } from '@/context/EnrollmentContext';
import { courses } from '@/lib/courses';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function MyCoursesPage() {
  const { isAuthenticated, loading } = useAuth();
  const { enrolledCourses } = useEnrollment();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, loading, router]);
  
  const myCourses = courses.filter(course => enrolledCourses.has(course.id));

  if (loading || !isAuthenticated) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 pt-22 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Minha Jornada</h1>
        <p className="mt-4 text-lg text-muted-foreground">Continue sua jornada e domine novas habilidades.</p>
      </div>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center rounded-lg border border-white/10 bg-card/50 backdrop-blur-lg p-12">
            <h3 className="text-lg font-medium text-foreground">Nenhum Curso Ainda</h3>
          <p className="mt-2 text-muted-foreground">Você não se inscreveu em nenhum curso. Explore nosso catálogo para começar!</p>
          <Button asChild className="mt-6">
            <Link href="/courses">
              Explorar Cursos
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
