'use client';

import React from 'react';
import Link from 'next/link';
import { getCoursesByCategory, Course } from '@/lib/courses';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Image from 'next/image';

interface CourseCtaProps {
  category: string;
}

const RecommendedCourseCard = ({ course }: { course: Course }) => {
  return (
    <Link 
      href={`/courses/${course.id}`} 
      className="group block rounded-lg p-3 -m-3 transition-colors hover:bg-white/5"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
           <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={course['data-ai-hint']}
            />
        </div>
        <div>
          <h4 className="font-semibold text-foreground transition-colors group-hover:text-primary">{course.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </div>
      </div>
    </Link>
  );
};

export function CourseCta({ category }: CourseCtaProps) {
  const recommendedCourses = getCoursesByCategory(category, 3);

  if (recommendedCourses.length === 0) {
    // Fallback if no courses are found for the category
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <div className="text-center rounded-lg border border-dashed p-12">
                <h3 className="text-lg font-medium text-foreground">Próximo Passo?</h3>
                <p className="mt-2 text-muted-foreground">Continue sua jornada para a maestria. Explore todas as nossas forjas.</p>
                <Button asChild className="mt-6">
                    <Link href="/courses/all">
                        Explorar Todas as Jornadas
                    </Link>
                </Button>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-24">
      <Card className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="max-w-md">
              <div className="flex items-center gap-3 text-primary">
                <GraduationCap className="h-6 w-6" />
                <h2 className="font-headline text-3xl font-bold">Continue a Conversa</h2>
              </div>
              <p className="mt-4 text-lg text-muted-foreground">
                Gostou desta ideia? Transforme inspiração em domínio com nossas jornadas de aprendizado completas.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/courses/all">
                      Explorar Todas as Jornadas
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
              </div>
            </div>

            <div className="w-full">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Jornadas Recomendadas
                </h3>
                <div className="space-y-6">
                  {recommendedCourses.map(course => (
                    <RecommendedCourseCard key={course.id} course={course} />
                  ))}
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
}
