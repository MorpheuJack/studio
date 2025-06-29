
"use client";

import type { Course } from '@/lib/courses';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Video, FileText, CheckCircle2 } from 'lucide-react';

interface CourseLessonNavigatorProps {
  course: Course;
}

export function CourseLessonNavigator({ course }: CourseLessonNavigatorProps) {
  const params = useParams<{ courseId: string, lessonId: string }>();
  const { courseId, lessonId } = params;

  // Find which module is currently active to open it by default
  const defaultActiveModules = course.modules
    .filter(module => module.lessons.some(lesson => lesson.id === lessonId))
    .map(module => module.id);
  
  return (
    <Card className="overflow-hidden">
        <CardHeader>
            <CardTitle className="text-lg">Course Content</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="multiple" defaultValue={defaultActiveModules} className="w-full">
                {course.modules.map((module) => (
                    <AccordionItem value={module.id} key={module.id} className="border-x-0 border-t-0 rounded-none px-6 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold hover:no-underline p-0 py-4">
                            {module.title}
                        </AccordionTrigger>
                        <AccordionContent className="p-0 pb-4">
                            <ul className="space-y-1 pt-2">
                                {module.lessons.map((lesson) => {
                                const isActive = lessonId === lesson.id;
                                const Icon = isActive ? CheckCircle2 : (lesson.type === 'video' ? Video : FileText);

                                return (
                                    <li key={lesson.id}>
                                    <Link
                                        href={`/courses/${courseId}/lessons/${lesson.id}`}
                                        className={cn(
                                        'flex items-center gap-3 rounded-md p-2 text-sm transition-colors',
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
        </CardContent>
    </Card>
  );
}
