
import { Hero } from "@/components/layout/Hero";
import { courses } from '@/lib/courses';
import Link from 'next/link';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  // Use more courses for a better carousel experience
  const featuredCourses = courses.slice(0, 6);

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Cursos em Destaque
            </h2>
            <Button asChild variant="link" className="text-sm text-primary hover:text-primary/80 shrink-0">
              <Link href="/courses/all">
                Ver todos os cursos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
           <Carousel
              opts={{
                align: "start",
                loop: featuredCourses.length > 3,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredCourses.map((course) => (
                  <CarouselItem key={course.id} className="pl-4 basis-4/5 md:basis-1/2 lg:basis-1/3">
                    <CourseCard course={course} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </section>
      </div>
    </>
  );
}
