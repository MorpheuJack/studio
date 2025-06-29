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
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
        {/* Left Column - Text Content */}
        <div className="flex flex-col gap-6">
          <p className="font-headline text-lg font-bold text-primary">#{course.category}</p>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Aprox. {Math.round(totalDuration / 60)} horas</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>{totalLessons} aulas</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">{course.longDescription}</p>

          <div>
            <h3 className="mb-4 font-headline text-xl font-semibold">Destaques do Curso</h3>
            <div className="flex flex-wrap gap-2">
              {course.highlights.map((highlight) => (
                <Badge key={highlight} variant="default" className="text-sm">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-4">
             {enrolled ? (
              <Button size="lg" onClick={handleContinue} className="w-full sm:w-auto">
                Continuar Aprendendo
              </Button>
              ) : (
              <Button size="lg" onClick={handleEnroll} className="w-full sm:w-auto">
                Inscreva-se Gratuitamente
              </Button>
             )}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative h-80 w-full md:h-full min-h-[400px] lg:min-h-[500px]">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover rounded-2xl shadow-2xl shadow-primary/10"
            data-ai-hint={course['data-ai-hint']}
            priority
          />
        </div>
      </header>

      <main className="mt-24 space-y-24">
        {/* Tools Section */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-start">
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

        <section>
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              O que você vai aprender
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore todos os módulos e aulas que preparamos para você mergulhar de cabeça no conhecimento.
            </p>
          </div>
          <div className="max-w-4xl mx-auto border rounded-xl shadow-lg overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module, index) => (
                <AccordionItem value={`item-${index}`} key={module.id} className={index === course.modules.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="text-left hover:no-underline p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold text-lg">{`0${index + 1}`}</span>
                      <span className="font-headline text-xl font-semibold">{module.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-muted/30">
                    <ul className="space-y-1 p-6 pt-2">
                      {module.lessons.map((lesson) => {
                        const Icon = lesson.type === 'video' ? Video : FileText;
                        return (
                          <li key={lesson.id} className="flex items-center justify-between rounded-md p-4 transition-colors">
                            <div className="flex items-center gap-4">
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="font-medium text-foreground/90">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration} min</span>
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
      </main>
    </div>
  );
}
