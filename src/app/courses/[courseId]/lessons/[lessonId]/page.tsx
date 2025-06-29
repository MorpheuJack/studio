
'use client';

import { notFound, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getLessonByIds } from '@/lib/courses';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Lock, Heart, Share2, Eye, Signal, Clock, BrainCircuit } from 'lucide-react';
import type { Course, Module, Lesson } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RelatedVideos } from '@/components/courses/RelatedVideos';
import { CourseLessonNavigator } from '@/components/courses/CourseLessonNavigator';
import { useAssistant } from '@/context/AssistantContext';
import { IntegratedIDE } from '@/components/courses/IntegratedIDE';

export default function LessonPage() {
  const params = useParams<{ courseId: string, lessonId: string }>();
  const { isAuthenticated, loading } = useAuth();
  const { setAssistantOpen } = useAssistant();
  
  const data = getLessonByIds(params.courseId, params.lessonId);

  if (!data) {
    notFound();
  }

  const { course, lesson } = data as { course: Course; module: Module; lesson: Lesson };

  if (loading) {
    return (
      <div className="container mx-auto flex h-[calc(100vh-12rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verificando acesso...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="container mx-auto px-4 pb-8 pt-22 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-6">
            {/* Player / IDE */}
            {lesson.type === 'video' && (
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted shadow-lg">
                {/* This would be a real video player */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Reprodutor de vídeo</p>
                </div>
              </div>
            )}
            
            {lesson.type === 'code' && lesson.starterCode && (
              <div className="h-[70vh] min-h-[600px] w-full">
                <IntegratedIDE starterCode={lesson.starterCode} />
              </div>
            )}

            {/* Lesson Details */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                          <AvatarImage src="/img/RG-personagem.png" alt="Revolução Cognitiva" />
                          <AvatarFallback>RC</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-bold text-foreground">Revolução Cognitiva</p>
                          <p className="text-sm text-muted-foreground">1.9M subscribers</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <Button onClick={() => setAssistantOpen(true)}>
                          <BrainCircuit className="mr-2 h-4 w-4" />
                          Desafie seu Guia Socrático
                      </Button>
                  </div>
              </div>

              <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{lesson.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>125,308 views</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>47,967 likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4" />
                      <span>Streaming live</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration} min duration</span>
                  </div>
              </div>

              <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
                  <p>{lesson.content}</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
              <CourseLessonNavigator course={course} />
              <RelatedVideos lesson={lesson} />
          </div>
        </div>
      </div>
    );
  }

  // Not Authenticated View
  return (
    <div className="container mx-auto">
        <Card className="flex flex-col h-[calc(100vh-12rem)] shadow-lg items-center justify-center text-center p-8">
            <Lock className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="font-headline text-3xl md:text-4xl">A Forja Aguarda</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground max-w-md">
                Apenas artesãos registrados podem entrar nesta forja. Faça login ou junte-se ao movimento para construir sua maestria.
            </CardDescription>
            <div className="mt-8 flex gap-4">
                <Button asChild size="lg">
                    <Link href="/auth">Entrar / Juntar-se à Revolução</Link>
                </Button>
            </div>
        </Card>
    </div>
  );
}
