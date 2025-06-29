"use client";

import type { Course } from '@/lib/courses';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Video, FileText, CheckCircle2 } from 'lucide-react';

interface LessonSidebarProps {
  course: Course;
}

export function LessonSidebar({ course }: LessonSidebarProps) {
  const params = useParams<{ courseId: string, lessonId: string }>();
  const { courseId, lessonId } = params;

  // Determine default active modules based on the current lesson
  const defaultActiveModules = course.modules.filter(module => 
    module.lessons.some(lesson => lesson.id === lessonId)
  ).map(module => module.id);
  
  return (
    <div className="sticky top-24">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
          {course.title}
      </h1>
      <h2 className="text-lg font-semibold text-muted-foreground mb-6">Course Content</h2>
      
      <Accordion type="multiple" defaultValue={defaultActiveModules} className="w-full space-y-2">
        {course.modules.map((module) => (
          <AccordionItem value={module.id} key={module.id} className="border-none">
            <AccordionTrigger className="text-left font-semibold hover:no-underline p-4 bg-card rounded-lg data-[state=open]:rounded-b-none">
                {module.title}
            </AccordionTrigger>
            <AccordionContent className="bg-card rounded-b-lg mt-0">
              <ul className="space-y-1 p-4 pt-0">
                {module.lessons.map((lesson) => {
                  const isActive = lessonId === lesson.id;
                  const Icon = isActive ? CheckCircle2 : (lesson.type === 'video' ? Video : FileText);

                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/courses/${courseId}/lessons/${lesson.id}`}
                        className={cn(
                          'flex items-center gap-3 rounded-md p-3 text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-primary")} />
                        <span className="flex-1">{lesson.title}</span>
                        <span className="text-xs">{lesson.duration}m</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
