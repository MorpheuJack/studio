
'use client';

import { notFound, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getLessonByIds } from '@/lib/courses';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Lock, Heart, Share2, Eye, Signal, Clock, BrainCircuit, Volume2 } from 'lucide-react';
import type { Course, Module, Lesson } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RelatedVideos } from '@/components/courses/RelatedVideos';
import { CourseLessonNavigator } from '@/components/courses/CourseLessonNavigator';
import { useAssistant } from '@/context/AssistantContext';
import { IntegratedIDE } from '@/components/courses/IntegratedIDE';
import { AudioPlayer } from '@/components/ui/audio-player';

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
      <div className="container mx-auto flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Verificando acesso...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="container mx-auto px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 xl:col-span-3 flex flex-col space-y-6 order-2 lg:order-1">
            {/* Player / IDE */}
            <div className="order-2 lg:order-1">
              {lesson.type === 'video' && (
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted shadow-lg">
                  {/* This would be a real video player */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Reprodutor de vídeo</p>
                  </div>
                </div>
              )}
              
              {lesson.type === 'code' && lesson.starterCode && (
                <div className="h-[60vh] min-h-[500px] md:h-[70vh] md:min-h-[600px] w-full">
                  <IntegratedIDE starterCode={lesson.starterCode} />
                </div>
              )}
            </div>

            {/* Lesson Details */}
            <div className="space-y-4 order-1 lg:order-2">
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
              
              {lesson.audioUrl && (
                <div className="my-6">
                    <AudioPlayer
                        src={lesson.audioUrl}
                    />
                </div>
              )}

              <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
                  <p>{lesson.content}</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6 order-1 lg:order-2">
              <CourseLessonNavigator course={course} />
              <RelatedVideos lesson={lesson} />
          </div>
        </div>
      </div>
    );
  }

  // Not Authenticated View
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="mb-8">
            <BrainCircuit className="h-12 w-12 text-primary" />
        </div>
        <div className="flex flex-col items-center justify-center text-center">
            <Lock className="h-16 w-16 text-primary mb-4" />
            <h1 className="font-headline text-3xl md:text-4xl font-bold">A Forja Aguarda</h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-md">
                Apenas artesãos registrados podem entrar nesta forja. Faça login ou junte-se ao movimento para construir sua maestria.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
                <Button asChild size="lg">
                    <Link href="/auth">Entrar / Juntar-se à Revolução</Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
