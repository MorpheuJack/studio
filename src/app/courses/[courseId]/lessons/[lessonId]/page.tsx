import { getLessonByIds } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, FileText, Clock } from 'lucide-react';
import { SummarizeAction } from '@/components/courses/SummarizeAction';
import type { Course, Module, Lesson } from '@/lib/courses';

export default function LessonPage({ params }: { params: { courseId: string, lessonId: string } }) {
  const data = getLessonByIds(params.courseId, params.lessonId);

  if (!data) {
    notFound();
  }

  const { course, module, lesson } = data as { course: Course; module: Module; lesson: Lesson };
  
  const Icon = lesson.type === 'video' ? Video : FileText;
  const typeText = lesson.type === 'video' ? 'Videoaula' : 'Artigo';

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)] shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon className="h-4 w-4" />
                    <span>{typeText}</span>
                    <span className="mx-1">·</span>
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration} min</span>
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl">{lesson.title}</CardTitle>
            </div>
            {lesson.type === 'article' && <SummarizeAction lessonContent={lesson.content} />}
        </div>
      </CardHeader>
      
      <CardContent className="overflow-y-auto">
        <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
            {lesson.type === 'video' && (
                <div className="aspect-video w-full bg-muted rounded-lg mb-6 flex items-center justify-center">
                    <p className="text-muted-foreground">Reprodutor de vídeo</p>
                </div>
            )}
            <p>{lesson.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
