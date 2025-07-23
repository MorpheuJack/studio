
"use client";

import { getCourseById } from '@/lib/courses';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '@/context/EnrollmentContext';
import { useAuth } from '@/context/AuthContext';
import { Clock, BarChart, Check, Video, FileText, FileCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);
  const { enrollCourse, isEnrolled } = useEnrollment();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!course) {
    notFound();
  }

  const enrolled = isEnrolled(course.id);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((acc, module) => acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0), 0);

  const handleEnroll = () => {
    if (isAuthenticated) {
      enrollCourse(course);
    } else {
      router.push('/auth');
    }
  };
  
  const handleContinue = () => {
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      router.push(`/courses/${course.id}/lessons/${firstLesson.id}`);
    }
  };

  const getLessonIcon = (type: 'video' | 'article' | 'code') => {
      switch (type) {
          case 'video':
              return Video;
          case 'article':
              return FileText;
          case 'code':
              return FileCode;
          default:
              return FileText;
      }
  };

  return (
    <>
      <header className="relative w-full h-[85vh] min-h-[650px] md:h-screen md:min-h-[700px] overflow-hidden -mt-14">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover animate-slow-zoom hidden md:block"
          data-ai-hint={course['data-ai-hint']}
          priority
        />
        <Image
          src={course.mobileImage || course.image}
          alt={course.title}
          fill
          className="object-cover animate-slow-zoom md:hidden"
          data-ai-hint={course['data-ai-hint']}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex h-full flex-col justify-end pb-24 text-white md:pb-36">
                <div className="max-w-3xl">
                    <p className="font-headline text-lg font-bold text-primary">#{course.category}</p>
                    <h1
                        className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
                    >
                        {course.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Aprox. {Math.round(totalDuration / 60)} horas</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            <span>{totalLessons} desafios</span>
                        </div>
                    </div>
                    <p className="mt-4 text-base text-white/80 line-clamp-3 md:mt-6 md:text-lg">{course.longDescription}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                         {enrolled ? (
                          <Button size="lg" onClick={handleContinue}>
                            Continuar na Forja
                          </Button>
                          ) : (
                          <>
                            <Button size="lg" onClick={handleEnroll}>
                              Entre na Forja. É Gratuito.
                            </Button>
                             {course.previewVideoUrl && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="lg" variant="outline">
                                            Veja a Mágica
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl lg:max-w-4xl p-0 overflow-hidden rounded-xl">
                                        <div className="aspect-video">
                                            <iframe
                                                className="w-full h-full"
                                                src={course.previewVideoUrl}
                                                title={`Prévia do curso ${course.title}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <DialogTitle className="font-headline text-2xl">{`A Promessa: ${course.title}`}</DialogTitle>
                                            <DialogDescription className="text-base text-muted-foreground">
                                                {course.longDescription}
                                            </DialogDescription>
                                            <div className="pt-4">
                                                <Button size="lg" onClick={handleEnroll} className="w-full">
                                                    Entre na Forja
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                          </>
                         )}
                    </div>
                </div>
            </div>
        </div>
      </header>

      <main className="relative bg-background">
        <div className="container mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
            <div className="space-y-16 md:space-y-24">
                <section className="relative z-10 -mt-20 sm:-mt-40 md:-mt-48">
                    <div className="rounded-2xl p-8 border border-white/10 bg-card/50 backdrop-blur-lg shadow-2xl">
                      <h2 className="font-headline text-2xl font-bold mb-4">O Que Você Vai Dominar</h2>
                      <div className="flex flex-wrap gap-2">
                        {course.highlights.map((highlight) => (
                          <Badge key={highlight} variant="default" className="text-sm">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Arsenal */}
                    <div className="lg:col-span-2 lg:sticky lg:top-24">
                        <div className="rounded-2xl p-8 sm:p-12 border border-white/10 bg-card/50 backdrop-blur-lg">
                            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Seu Arsenal de Criação
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Domine o arsenal que os artesãos usam. Aqui, você não aprende sobre tecnologia, você a comanda.
                            </p>
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {course.tools.map((tool) => (
                                <div key={tool} className="flex items-center gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                    <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="font-medium">{tool}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Mapa */}
                    <div className="lg:col-span-3">
                        <div className="text-left mb-8 md:mb-12">
                          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            O Mapa da Sua Forja
                          </h2>
                          <p className="mt-3 text-lg text-muted-foreground">
                            Cada módulo é um novo desafio para o seu intelecto. Veja o mapa da sua jornada para a maestria.
                          </p>
                        </div>
                        <div className="w-full">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {course.modules.map((module) => {
                                    const totalLessonsInModule = module.lessons.length;
                                    const totalDurationInModule = module.lessons.reduce((acc, lesson) => acc + lesson.duration, 0);

                                    return (
                                        <AccordionItem value={module.id} key={module.id} className="border border-white/10 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                                            <AccordionTrigger className="text-left hover:no-underline p-6 w-full group">
                                               <div className="flex flex-col items-start gap-1">
                                                    <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{module.title}</span>
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        {totalLessonsInModule} aulas • ~{totalDurationInModule} min
                                                    </span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                               <div className="border-t border-white/10">
                                                   <ul className="space-y-1 p-4">
                                                        {module.lessons.map((lesson) => {
                                                            const Icon = getLessonIcon(lesson.type);
                                                            return (
                                                                <li key={lesson.id} className="flex items-center gap-4 justify-between rounded-md p-3 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                                                                    <div className="flex items-center gap-3">
                                                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                                                        <span className="font-medium">{lesson.title}</span>
                                                                    </div>
                                                                    <span className="text-sm">{lesson.duration} min</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                               </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </main>
    </>
  );
}
