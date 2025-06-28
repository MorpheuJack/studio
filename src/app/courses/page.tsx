import { courses } from '@/lib/courses';
import type { Course } from '@/lib/courses';
import Link from 'next/link';
import { CourseCard } from '@/components/courses/CourseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Explore Nossos Cursos
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Navegue por nossas trilhas de conhecimento e encontre sua próxima paixão.
        </p>
      </div>

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

      <div className="mt-20 text-center">
        <p className="text-muted-foreground mb-4">Pronto para ver tudo de uma vez?</p>
        <Button asChild size="lg">
          <Link href="/courses/all">
            Ver Todos os Cursos
            <BookOpen className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
