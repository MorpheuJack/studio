'use client';

import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      const fadeEnd = screenHeight * 0.7; // 70% of the viewport height

      if (scrollY > fadeEnd) {
        setHeaderOpacity(0);
      } else {
        const opacity = 1 - scrollY / fadeEnd;
        setHeaderOpacity(Math.max(0, Math.min(1, opacity)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    notFound();
  }

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background">
      {/* Banner Image - Fixed Background */}
      <div
        className="fixed inset-0 z-0 h-screen w-screen"
        aria-hidden="true"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          data-ai-hint={post['data-ai-hint']}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Post Header - Fades on Scroll */}
      <header
        className="relative z-10 flex h-screen flex-col items-center justify-center text-center"
        style={{ opacity: headerOpacity }}
      >
        <div className="container px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
            {post.title}
            </h1>
            <div className="mt-8 flex justify-center items-center gap-4 text-background/80">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background/50">
                    <AvatarImage src={post.authorAvatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <span className="font-semibold text-background">{post.author}</span>
                        <p className="text-sm">{post.date}</p>
                    </div>
                </div>
            </div>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-10 animate-bounce rounded-full p-2 text-foreground"
          aria-label="Scroll to content"
        >
          <ArrowDown className="h-8 w-8" />
        </button>
      </header>

      {/* Post Content */}
      <article
        ref={contentRef}
        className="relative z-10 bg-background px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl
          prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-foreground 
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80
          prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:font-normal">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h2 key={index}>
                  {paragraph.replaceAll('**', '')}
                </h2>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
