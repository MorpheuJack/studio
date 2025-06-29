
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
import { cn } from '@/lib/utils';


export function BlogHero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const featuredPosts = getAllPosts().slice(0, 3);
  const AUTOPLAY_DELAY = 6000;

  const plugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
    plugin.current.play(); // Restart autoplay after manual navigation
  };
  
  if (featuredPosts.length === 0) {
    return null;
  }

  const currentPost = featuredPosts[current];

  return (
    <section 
      className="relative w-full -mt-14 h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Image Stacker */}
      <div className="absolute inset-0 z-0">
        {featuredPosts.map((post, index) => (
          <Image
            key={post.slug}
            src={post.image}
            alt={post.title}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000 ease-in-out",
              current === index ? "opacity-100 animate-slow-zoom" : "opacity-0"
            )}
            priority
            data-ai-hint={post['data-ai-hint']}
          />
        ))}
      </div>

      {/* Controller Carousel (visually hidden, but available to JS) */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="sr-only"
      >
        <CarouselContent>
          {featuredPosts.map((post) => (
            <CarouselItem key={post.slug} />
          ))}
        </CarouselContent>
      </Carousel>


      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Foreground Content Grid */}
      <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full w-full flex-col justify-end gap-6 pb-20 md:grid md:grid-cols-3 md:items-center md:gap-8 md:pb-0 lg:grid-cols-4">
          
          {/* Main Content Text (Left) */}
          <div className="text-white md:col-span-2 lg:col-span-3">
            {currentPost && (
              <div className="max-w-3xl">
                <Badge variant="secondary" className="mb-4 bg-white/10 text-white backdrop-blur-sm border-white/20">Artigo em Destaque</Badge>
                <h1
                  className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
                >
                  {currentPost.title}
                </h1>
                <p className="mt-6 text-lg text-white/80 line-clamp-3">{currentPost.description}</p>
                <div className="mt-10">
                  <Button asChild size="lg">
                    <Link href={`/blog/${currentPost.slug}`}>
                      Ler Artigo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Side Posts Navigation (Right) */}
          <div className="relative md:col-span-1">
            <div
              className="group/sidebar flex flex-row gap-3 overflow-x-auto pb-2 hide-scrollbar md:flex-col md:gap-4 md:overflow-x-visible md:pb-0"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.play}
            >
              {featuredPosts.map((post, index) => (
                <button
                  key={post.slug}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "relative w-full max-w-[12rem] flex-shrink-0 rounded-xl border-2 bg-secondary/50 p-3 text-left backdrop-blur-md transition-all duration-300 hover:bg-secondary sm:max-w-[14rem] md:max-w-none",
                    current === index 
                      ? "border-primary shadow-lg" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md md:h-14 md:w-14">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post['data-ai-hint']}
                      />
                    </div>
                    <div className="text-white">
                      <h3 className="text-xs font-semibold leading-tight line-clamp-2 md:text-sm">{post.title}</h3>
                      <p className="mt-1 text-xs text-white/70">{post.author}</p>
                    </div>
                  </div>
                  {current === index && (
                    <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-lg bg-primary/20">
                      <div
                        key={current} // Key change restarts animation
                        className="h-full bg-primary animate-progress-bar group-hover/sidebar:animate-pause"
                        style={{ animationDuration: `${AUTOPLAY_DELAY / 1000}s` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
             {/* Fade effect for mobile */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent md:hidden" />
          </div>

        </div>
      </div>
    </section>
  );
}
