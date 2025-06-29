
'use client';

import React from 'react';
import Link from 'next/link';
import { getCoursesByCategory, Course } from '@/lib/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Image from 'next/image';

interface CourseCtaProps {
  category: string;
}

const RecommendedCourseCard = ({ course }: { course: Course }) => {
  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-primary/10">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
           <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              data-ai-hint={course['data-ai-hint']}
            />
        </div>
        <div>
          <h4 className="font-semibold text-foreground group-hover:text-primary">{course.title}</h4>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>
      </div>
    </Link>
  );
};

export function CourseCta({ category }: CourseCtaProps) {
  const recommendedCourses = getCoursesByCategory(category, 2);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-muted/30 shadow-2xl shadow-primary/10">
        <CardHeader className="p-8">
          <div className="flex items-center gap-4 text-primary">
            <GraduationCap className="h-8 w-8" />
            <h2 className="font-headline text-3xl font-bold">Continue a Conversa</h2>
          </div>
          <CardDescription className="text-lg mt-2">
            Gostou desta ideia? Temos jornadas completas que transformam inspiração em domínio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-8 pt-0 pb-8">
          {recommendedCourses.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Jornadas Recomendadas
              </h3>
              <div className="space-y-4">
                {recommendedCourses.map(course => (
                  <RecommendedCourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
           <div className="pt-4">
             <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/courses/all">
                  Explorar Todas as Jornadas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
             </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
