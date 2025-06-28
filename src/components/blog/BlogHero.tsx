'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { getAllPosts } from '@/lib/blog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function BlogHero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Get first 3 posts to feature
  const featuredPosts = getAllPosts().slice(0, 3);

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

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full -mt-14 mb-12 border-b">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredPosts.map((item, index) => (
            <CarouselItem key={item.slug}>
              <div className="relative h-screen max-h-[700px] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={item['data-ai-hint']}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute inset-0 bg-black/50" />
                
                <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
                  <div className="relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28 text-white">
                    <div className="max-w-3xl">
                      <Badge variant="secondary" className="mb-4 bg-white/10 text-white backdrop-blur-sm border-white/20">Artigo em Destaque</Badge>
                      <h1
                        className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
                      >
                        {item.title}
                      </h1>
                      <p className="mt-6 text-lg leading-8 text-white/80">
                        {item.description}
                      </p>
                      <div className="mt-10">
                        <Button asChild size="lg">
                          <Link href={`/blog/${item.slug}`}>
                            Ler Artigo
                            <ArrowRight className="ml-2 h-5 w-5" />
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

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex space-x-2">
          {featuredPosts.map((_, index) => (
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
