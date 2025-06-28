
import { Hero } from "@/components/layout/Hero";
import { courses } from '@/lib/courses';
import Link from 'next/link';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  // Get first 3 courses to feature
  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Cursos em Destaque
            </h2>
            <Button asChild variant="link" className="text-sm text-primary hover:text-primary/80 shrink-0">
              <Link href="/courses/all">
                Ver todos os cursos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
