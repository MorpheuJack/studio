
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import Link from 'next/link';
import Image from 'next/image';
import { CourseCard } from '@/components/courses/CourseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CoursesCategoriesPage() {
  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    const { category } = course;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const categories = Object.keys(coursesByCategory);

  return (
    <>
      <section className="relative bg-muted py-20 md:py-28 overflow-hidden border-b">
          <div className="absolute inset-0">
              <Image
                  src="https://placehold.co/1920x500.png"
                  alt="Alunos estudando tecnologia"
                  fill
                  className="object-cover opacity-10"
                  data-ai-hint="learning technology"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
                <div className="flex justify-center md:justify-start">
                  <Image
                    src="/img/RG-personagem.png"
                    alt="Professor AI, mascote da Revolução Cognitiva"
                    width={400}
                    height={400}
                    className="w-full h-auto max-w-[350px] md:max-w-full object-contain animate-float-subtle"
                    data-ai-hint="character mascot"
                    priority
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                      Explore Nossas Trilhas de Conhecimento
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground">
                      Mergulhe em cursos projetados por especialistas para impulsionar sua carreira em Inteligência Artificial, Design e Marketing. Encontre sua próxima paixão e comece a aprender hoje.
                  </p>
                  <Button asChild size="lg" className="mt-8">
                      <Link href="/courses/all">
                          Ver Todos os Cursos
                          <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                  </Button>
                </div>
              </div>
          </div>
      </section>
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="flex flex-col gap-16">
          {categories.map((category) => (
            <section key={category}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">
                  {category}
                </h2>
                <Button asChild variant="link" className="text-sm text-primary hover:text-primary/80 shrink-0">
                  <Link href={`/courses/all?category=${encodeURIComponent(category)}`}>
                    Ver todos
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Carousel
                opts={{
                  align: "start",
                  // Only loop if there are enough cards to make looping feel natural
                  loop: coursesByCategory[category].length > 5,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {coursesByCategory[category].map((course) => (
                    <CarouselItem key={course.id} className="pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <CourseCard course={course} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Hide arrows on mobile, where swiping is more common */}
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
