import { getLessonByIds } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, FileText, Clock } from 'lucide-react';
import { SummarizeAction } from '@/components/courses/SummarizeAction';

export default function LessonPage({ params }: { params: { courseId: string, lessonId: string } }) {
  const data = getLessonByIds(params.courseId, params.lessonId);

  if (!data) {
    notFound();
  }

  const { lesson } = data;
  const Icon = lesson.type === 'video' ? Video : FileText;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon className="h-4 w-4" />
                    <span>{lesson.type === 'video' ? 'Video Lesson' : 'Article'}</span>
                    <span className="mx-1">·</span>
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration} min read</span>
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl">{lesson.title}</CardTitle>
            </div>
            <SummarizeAction lessonContent={lesson.content} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none text-foreground/90">
            {lesson.type === 'video' && (
                <div className="aspect-video w-full bg-muted rounded-lg mb-6 flex items-center justify-center">
                    <p className="text-muted-foreground">Video player placeholder</p>
                </div>
            )}
            <p>{lesson.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
