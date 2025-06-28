
'use client';

import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getLessonByIds } from '@/lib/courses';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Video, FileText, Clock, Loader2, Lock } from 'lucide-react';
import type { Course, Module, Lesson } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LessonPage() {
  const params = useParams<{ courseId: string, lessonId: string }>();
  const { isAuthenticated, loading } = useAuth();
  
  const data = getLessonByIds(params.courseId, params.lessonId);

  if (!data) {
    notFound();
  }

  const { lesson } = data as { course: Course; module: Module; lesson: Lesson };
  const Icon = lesson.type === 'video' ? Video : FileText;
  const typeText = lesson.type === 'video' ? 'Videoaula' : 'Artigo';

  if (loading) {
    return (
      <Card className="flex flex-col h-[calc(100vh-12rem)] shadow-lg items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verificando acesso...</p>
      </Card>
    );
  }

  if (isAuthenticated) {
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

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)] shadow-lg items-center justify-center text-center p-8">
        <Lock className="h-16 w-16 text-primary mb-4" />
        <CardTitle className="font-headline text-3xl md:text-4xl">Conteúdo Bloqueado</CardTitle>
        <CardDescription className="mt-2 text-lg text-muted-foreground max-w-md">
            Você precisa estar logado para acessar esta lição. Crie uma conta ou faça login para continuar sua jornada de aprendizado.
        </CardDescription>
        <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
                <Link href="/auth">Login / Cadastro</Link>
            </Button>
        </div>
    </Card>
  );
}
