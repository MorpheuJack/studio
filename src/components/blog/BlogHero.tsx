
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

  // Get first 3 posts to feature
  const featuredPosts = getAllPosts().slice(0, 3);
  const AUTOPLAY_DELAY = 6000;

  const plugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
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
    plugin.current.reset();
  };
  
  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full -mt-14 border-b bg-background/50 h-screen min-h-[700px] overflow-hidden flex items-center">
        <div className="container mx-auto h-full max-h-[700px] py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full h-full">
                
                {/* Main Carousel */}
                <div className="md:col-span-2 lg:col-span-3 h-full">
                    <Carousel
                        setApi={setApi}
                        plugins={[plugin.current]}
                        className="w-full h-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="h-full -ml-4">
                        {featuredPosts.map((post, index) => (
                            <CarouselItem key={post.slug} className="h-full pl-4">
                                <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                        priority={index === 0}
                                        data-ai-hint={post['data-ai-hint']}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    
                                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                        <div className="max-w-2xl">
                                            <Badge variant="secondary" className="mb-4 bg-white/10 text-white backdrop-blur-sm border-white/20">Artigo em Destaque</Badge>
                                            <h1
                                                className="font-headline text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                                                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
                                            >
                                                {post.title}
                                            </h1>
                                            <p className="mt-4 text-white/80 line-clamp-2">{post.description}</p>
                                            <div className="mt-8">
                                                <Button asChild size="lg">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        Ler Artigo
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Side Posts */}
                <div className="hidden md:flex flex-col gap-4 justify-center h-full">
                    {featuredPosts.map((post, index) => (
                        <button
                            key={post.slug}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "relative text-left p-4 rounded-xl border-2 transition-all duration-300 w-full overflow-hidden bg-card",
                                current === index 
                                ? "border-primary shadow-lg" 
                                : "border-transparent hover:border-primary/50"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={post['data-ai-hint']}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{post.author}</p>
                                </div>
                            </div>
                            {current === index && (
                                <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                                    <div
                                        key={current}
                                        className="h-full bg-primary animate-progress-bar"
                                        style={{ animationDuration: `${AUTOPLAY_DELAY / 1000}s` }}
                                    />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
}
