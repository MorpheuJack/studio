
'use client';

import { getPostBySlug } from '@/lib/blog';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { CourseCta } from '@/components/blog/CourseCta';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <header className="relative w-full h-screen min-h-[600px] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="absolute top-20 z-20">
                <Button asChild variant="outline" className="bg-background/20 text-white backdrop-blur-sm border-white/30 hover:bg-background/40">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para o Blog
                    </Link>
                </Button>
            </div>
            <div className="relative z-10 flex h-full flex-col justify-center text-white md:justify-end md:pb-24">
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
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <article className="my-12 rounded-xl border border-primary/20 bg-gradient-to-br from-slate-950 via-background to-slate-950 bg-[size:200%] p-8 shadow-2xl shadow-primary/10 animate-animated-gradient md:p-12">
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl
              prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-foreground
              prose-p:leading-relaxed prose-p:text-foreground/80
              prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-foreground/80
              prose-blockquote:border-l-foreground prose-blockquote:text-muted-foreground prose-blockquote:font-normal">
              
              {(post.videoUrl || post.audioUrl) && (
                <div className="not-prose">
                  {post.videoUrl && (
                    <div key="video-player" className="my-6 aspect-video">
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
                    <div key="audio-player" className="my-6">
                      <p className="text-sm font-medium mb-2 text-center">Ouça o panorama da entrevista de Elon Musk</p>
                      <audio controls className="w-full" src={post.audioUrl}>
                        Seu navegador não suporta o elemento de áudio.
                      </audio>
                    </div>
                  )}
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
    </main>
  );
}
