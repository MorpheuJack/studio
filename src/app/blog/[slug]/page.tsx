
'use client';

import { getPostBySlug } from '@/lib/blog';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { CourseCta } from '@/components/blog/CourseCta';

const getAudioType = (url: string | undefined): string => {
  if (!url) return '';
  if (url.endsWith('.mp3')) return 'audio/mpeg';
  if (url.endsWith('.wav')) return 'audio/wav';
  if (url.endsWith('.ogg')) return 'audio/ogg';
  return 'audio/mpeg'; // default
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const introParagraphIdentifier = "A inteligência artificial generativa capturou a imaginação do mundo";

  return (
    <main>
      <header className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover animate-slow-zoom"
          data-ai-hint={post['data-ai-hint']}
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-center md:text-left"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h1>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
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
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <article className="my-16 rounded-xl border border-primary/20 bg-gradient-to-br from-slate-950 via-background to-slate-950 bg-[size:200%] p-8 shadow-2xl shadow-primary/10 animate-animated-gradient md:p-12">
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl
              prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-primary
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:font-normal">
              {post.content.split('\n\n').map((paragraph, index) => {
                // If this is the paragraph to be replaced, and the post has an audioUrl, render the player instead.
                if (post.audioUrl && paragraph.startsWith(introParagraphIdentifier)) {
                  return (
                      <div key="audio-player" className="my-6">
                        <p className="text-sm font-medium mb-2 text-center">Ouça o panorama da entrevista de Elon Musk</p>
                        <audio controls className="w-full">
                          <source src={post.audioUrl} type={getAudioType(post.audioUrl)} />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                      </div>
                  );
                }

                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h2 key={index} className="text-center md:text-left">
                      {paragraph.replaceAll('**', '')}
                    </h2>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>
          </article>
      </div>

      <CourseCta category={post.category} />
    </main>
  );
}
