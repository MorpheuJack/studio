
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { courses, type Course } from '@/lib/courses';
import { posts, type Post } from '@/lib/blog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';

type FeaturedItem = {
  type: 'Curso' | 'Blog';
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  href: string;
  'data-ai-hint'?: string;
};

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Combine featured content from courses and blog posts
  const featuredContent: FeaturedItem[] = [
    ...courses.slice(0, 2).map((course: Course) => ({
      type: 'Curso',
      title: course.title,
      description: course.description,
      image: course.image,
      mobileImage: course.mobileImage,
      href: `/courses/${course.id}`,
      'data-ai-hint': course['data-ai-hint'],
    })),
    ...posts.slice(0, 1).map((post: Post) => ({
      type: 'Blog',
      title: post.title,
      description: post.description,
      image: post.image,
      mobileImage: post.mobileImage,
      href: `/blog/${post.slug}`,
      'data-ai-hint': post['data-ai-hint'],
    })),
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="relative w-full -mt-14">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredContent.map((item, index) => (
            <CarouselItem key={item.href} data-slide-index={index}>
              <div className="relative h-screen min-h-[600px] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hidden md:block"
                  priority={index === 0}
                  data-ai-hint={item['data-ai-hint']}
                />
                <Image
                  src={item.mobileImage || item.image}
                  alt={item.title}
                  fill
                  className="object-cover md:hidden"
                  priority={index === 0}
                  data-ai-hint={item['data-ai-hint']}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-black/60" />
                
                <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
                  <div className="relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28 text-white">
                    <div className="max-w-3xl">
                      <Badge variant="secondary" className="mb-4 bg-white/10 text-white backdrop-blur-sm border-white/20">{item.type}</Badge>
                      <h1
                        className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
                      >
                        {item.title}
                      </h1>
                      <p className="mt-6 text-lg leading-8 text-white/80">
                        {item.description}
                      </p>
                      <div className="mt-10 flex items-center gap-4">
                        <Button asChild size="lg">
                          <Link href={item.href}>
                            Inicie a Revolução
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                         <Button asChild size="lg" variant="outline">
                            <Link href="#">
                                Descubra a Mágica
                            </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
        <div className="flex space-x-2">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? 'w-6 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
