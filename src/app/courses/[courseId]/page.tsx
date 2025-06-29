
"use client";

import { getCourseById } from '@/lib/courses';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '@/context/EnrollmentContext';
import { Clock, BarChart, Check, Video, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();
  const course = getCourseById(params.courseId);
  const { enrollCourse, isEnrolled } = useEnrollment();
  const router = useRouter();

  if (!course) {
    notFound();
  }

  const enrolled = isEnrolled(course.id);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((acc, module) => acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0), 0);

  const handleEnroll = () => {
    enrollCourse(course);
  };
  
  const handleContinue = () => {
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      router.push(`/courses/${course.id}/lessons/${firstLesson.id}`);
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
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex h-full flex-col justify-end pb-16 text-white md:pb-28">
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
                            <span>{totalLessons} aulas</span>
                        </div>
                    </div>
                    <p className="mt-4 text-base text-white/80 line-clamp-3 md:mt-6 md:text-lg">{course.longDescription}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                         {enrolled ? (
                          <Button size="lg" onClick={handleContinue}>
                            Continuar Aprendendo
                          </Button>
                          ) : (
                          <>
                            <Button size="lg" onClick={handleEnroll}>
                              Inscreva-se Gratuitamente
                            </Button>
                             {course.previewVideoUrl && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="lg" variant="outline">
                                            Como funciona?
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl lg:max-w-4xl p-0 overflow-hidden rounded-lg">
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
                                            <DialogTitle className="font-headline text-2xl">{`Sobre o Curso: ${course.title}`}</DialogTitle>
                                            <DialogDescription className="text-base text-muted-foreground">
                                                {course.longDescription}
                                            </DialogDescription>
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
                <section className="relative z-10 -mt-36 sm:-mt-40 md:-mt-48">
                    <div className="rounded-2xl p-8 border border-white/10 bg-card/50 backdrop-blur-lg shadow-2xl">
                      <h2 className="font-headline text-2xl font-bold mb-4">Destaques do Curso</h2>
                      <div className="flex flex-wrap gap-2">
                        {course.highlights.map((highlight) => (
                          <Badge key={highlight} variant="default" className="text-sm">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                </section>

                {/* Tools Section */}
                <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center rounded-2xl p-8 sm:p-12 border border-white/10 bg-card/50 backdrop-blur-lg">
                    <div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Ferramentas e Tecnologias
                      </h2>
                      <p className="mt-4 text-lg text-muted-foreground">
                        Domine as ferramentas que o mercado de trabalho exige. Você aprenderá a usar as seguintes tecnologias na prática.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {course.tools.map((tool) => (
                        <div key={tool} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{tool}</span>
                        </div>
                      ))}
                    </div>
                </section>

                {/* Preview Section */}
                {course.previewVideoUrl && (
                  <section>
                    <div className="text-center mb-8">
                      <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Assista a uma prévia
                      </h2>
                      <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tenha um gostinho do que você vai aprender. Assista a uma aula introdutória e comece sua jornada.
                      </p>
                    </div>
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-2xl border shadow-2xl shadow-primary/10"
                        src={course.previewVideoUrl}
                        title={`Prévia do curso ${course.title}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </section>
                )}

                {/* What You'll Learn Section */}
                <section>
                    <div className="text-center mb-12">
                      <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        O que você vai aprender
                      </h2>
                      <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore o currículo completo do curso, módulo por módulo.
                      </p>
                    </div>
                    <div className="mx-auto max-w-3xl">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {course.modules.map((module) => (
                                <AccordionItem value={module.id} key={module.id} className="border-none">
                                    <AccordionTrigger className="text-left font-semibold text-xl hover:no-underline p-6 bg-card rounded-lg data-[state=open]:rounded-b-none">
                                        {module.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-card rounded-b-lg mt-0">
                                        <ul className="space-y-1 p-6 pt-2">
                                            {module.lessons.map((lesson) => {
                                            const Icon = lesson.type === 'video' ? Video : FileText;
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
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </div>
        </div>
      </main>
    </>
  );
}
