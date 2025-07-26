
'use client';

import { getPostBySlug } from '@/lib/blog';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { CourseCta } from '@/components/blog/CourseCta';
import { ChevronDown, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AudioPlayer } from '@/components/ui/audio-player';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="-mt-14">
      <header className="relative w-full h-screen min-h-[700px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover animate-slow-zoom hidden md:block"
          data-ai-hint={post['data-ai-hint']}
          priority
        />
        <Image
          src={post.mobileImage || post.image}
          alt={post.title}
          fill
          className="object-cover animate-slow-zoom md:hidden"
          data-ai-hint={post['data-ai-hint']}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex h-full flex-col items-center justify-end pb-40 text-white md:items-start md:justify-end md:pb-24">
                <div className="max-w-3xl text-center md:text-left">
                    <h1
                        className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
                    >
                        {post.title}
                    </h1>
                    <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                        <Avatar className="h-12 w-12 border-2 border-white/70">
                            <AvatarImage src={post.authorAvatar} alt={post.author} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-white">{post.author}</p>
                            <p className="text-sm text-white/80">{post.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 md:hidden">
          <p className="text-xs font-semibold text-white/70">Role para ler</p>
          <ChevronDown className="h-6 w-6 animate-bounce text-white" />
        </div>

        {/* Desktop scroll indicator */}
        <a 
          href="#content" 
          aria-label="Rolar para o conteúdo" 
          className="absolute bottom-10 right-10 z-20 hidden h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-black/50 md:flex group"
        >
          <ChevronDown className="h-8 w-8 transition-transform group-hover:translate-y-1" />
        </a>
      </header>

      <div id="content" className="container mx-auto px-4 sm:px-6 lg:px-8">
         <article className="my-12 rounded-xl border bg-card p-8 shadow-lg md:p-12">
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl
              prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-foreground
              prose-p:leading-relaxed prose-p:text-foreground/80
              prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-foreground/80
              prose-blockquote:border-l-foreground prose-blockquote:text-muted-foreground prose-blockquote:font-normal">
              
              {post.videoUrl && (
                <div className="not-prose my-6 aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={post.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {post.audioUrl && (
                <div className="my-6 sticky top-14 z-40">
                  <AudioPlayer
                    src={post.audioUrl}
                    title={post.title}
                    description="Ouça a narração deste artigo"
                  />
                </div>
              )}

              {post.content.split('\n\n').map((paragraph, index) => {
                // Handle H2
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h2 key={index}>
                      {paragraph.replaceAll('**', '')}
                    </h2>
                  );
                }
                
                // Handle paragraphs with inline bolding
                const parts = paragraph.split('**');
                const content = parts.map((part, i) => 
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                );

                return <p key={index}>{content}</p>;
              })}
            </div>
          </article>
      </div>

      <CourseCta category={post.category} />
    </div>
  );
}
