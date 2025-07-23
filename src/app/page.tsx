
import { Hero } from "@/components/layout/Hero";
import { courses } from '@/lib/courses';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { CourseCard } from '@/components/courses/CourseCard';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FeaturesSection } from "@/components/layout/FeaturesSection";
import { TimelineSection } from "@/components/layout/TimelineSection";
import { FaqSection } from "@/components/layout/FaqSection";

export default function Home() {
  const featuredCourses = courses.slice(0, 6);
  const featuredPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 space-y-24">
        {/* Featured Courses Section */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              Jornadas para a Maestria
            </h2>
            <Button asChild variant="link" className="mt-2 text-sm text-primary hover:text-primary/80">
              <Link href="/courses/all">
                Explorar todas as jornadas
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

        <FeaturesSection />

        {/* Featured Blog Posts Section */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">
              Ideias da Forja
            </h2>
            <Button asChild variant="link" className="mt-2 text-sm text-primary hover:text-primary/80">
              <Link href="/blog">
                Ler nosso manifesto
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
           <Carousel
              opts={{
                align: "start",
                loop: featuredPosts.length > 3,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredPosts.map((post) => (
                  <CarouselItem key={post.slug} className="pl-4 basis-4/5 md:basis-1/2 lg:basis-1/3">
                    <PostCard post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </section>
        
        <TimelineSection />

        <FaqSection />
      </div>
    </>
  );
}
