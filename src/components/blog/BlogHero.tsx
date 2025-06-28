'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getAllPosts } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function BlogHero() {
  // Get first 3 posts to feature
  const featuredPosts = getAllPosts().slice(0, 3);

  if (featuredPosts.length === 0) {
    return null;
  }

  const mainPost = featuredPosts[0];
  const otherPosts = featuredPosts.slice(1);

  return (
    <section className="w-full -mt-14 border-b bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12 lg:py-24 items-center">
            {/* Main Featured Post */}
            <div className="lg:col-span-3">
                <Link href={`/blog/${mainPost.slug}`} className="group block relative h-[400px] md:h-[450px] w-full rounded-xl overflow-hidden shadow-2xl">
                    <Image
                        src={mainPost.image}
                        alt={mainPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        data-ai-hint={mainPost['data-ai-hint']}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <Badge variant="secondary" className="mb-4 bg-white/10 text-white backdrop-blur-sm border-white/20">Artigo em Destaque</Badge>
                        <h1
                            className="font-headline text-3xl font-bold tracking-tight sm:text-4xl"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
                        >
                            {mainPost.title}
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-white/80 max-w-xl hidden sm:block">
                            {mainPost.description}
                        </p>
                        <div className="mt-6">
                            <Button asChild size="lg" className="bg-white/10 border-white/20 border backdrop-blur-sm hover:bg-white/20 text-white">
                                <span className="flex items-center">
                                    Ler Artigo
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </span>
                            </Button>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Other Featured Posts */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {otherPosts.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                        <div className="flex gap-4 items-start">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={post['data-ai-hint']}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-headline text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                                  <span>{post.author}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
