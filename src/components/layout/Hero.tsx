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
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';

type FeaturedItem = {
  type: 'Jornada' | 'Ideia';
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
    {
      type: 'Jornada',
      title: 'Engenharia de Prompt: A Arte de Forjar o Pensamento',
      description: 'Abandone a busca por respostas. Neste ginásio intelectual, você aprende a fazer as perguntas que constroem a maestria.',
      image: courses[0].image,
      mobileImage: courses[0].mobileImage,
      href: `/courses/${courses[0].id}`,
      'data-ai-hint': courses[0]['data-ai-hint'],
    },
    {
      type: 'Jornada',
      title: 'Design para IA: Modele a Intuição',
      description: 'Não desenhe telas, construa pontes. Aprenda a forjar a confiança entre a mente humana e a inteligência artificial.',
      image: courses[1].image,
      mobileImage: courses[1].mobileImage,
      href: `/courses/${courses[1].id}`,
      'data-ai-hint': courses[1]['data-ai-hint'],
    },
    {
      type: 'Ideia',
      title: 'Superinteligência: O Alerta de Musk',
      description: 'Uma conversa sobre o futuro da consciência e o despertar de uma nova era de pensamento.',
      image: posts[0].image,
      mobileImage: posts[0].mobileImage,
      href: `/blog/${posts[0].slug}`,
      'data-ai-hint': posts[0]['data-ai-hint'],
    },
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
                            Entre na Forja
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                         <Button asChild size="lg" variant="outline">
                            <Link href="/#faq">
                                Nossa Promessa
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
        <CarouselPrevious
          variant="ghost"
          className="hidden md:flex absolute left-8 h-12 w-12 rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
        />
        <CarouselNext
          variant="ghost"
          className="hidden md:flex absolute right-8 h-12 w-12 rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
        />
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
