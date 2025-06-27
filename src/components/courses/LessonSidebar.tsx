"use client";

import type { Course } from '@/lib/courses';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Video, FileText, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LessonSidebarProps {
  course: Course;
  onOpenAssistant: () => void;
}

export function LessonSidebar({ course, onOpenAssistant }: LessonSidebarProps) {
  const params = useParams();
  const pathname = usePathname();
  const { courseId } = params;

  const defaultActiveModules = course.modules.filter(module => 
    module.lessons.some(lesson => lesson.id === params.lessonId)
  ).map(module => module.id);
  
  return (
    <div className="sticky top-20">
        <h2 className="font-headline text-lg font-semibold mb-2 hidden md:block">{course.title}</h2>
        <h3 className="font-semibold text-muted-foreground mb-4 hidden md:block">Course Content</h3>
        <Button onClick={onOpenAssistant} className="w-full mb-4 hidden md:flex">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Fale com o Professor
        </Button>
        <Accordion type="multiple" defaultValue={defaultActiveModules} className="w-full">
        {course.modules.map((module) => (
          <AccordionItem value={module.id} key={module.id}>
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {module.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1">
                {module.lessons.map((lesson) => {
                  const isActive = pathname.includes(`/lessons/${lesson.id}`);
                  const Icon = lesson.type === 'video' ? Video : FileText;

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
                        <Icon className="h-4 w-4 flex-shrink-0" />
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
