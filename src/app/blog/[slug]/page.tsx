'use client';

import { getPostBySlug } from '@/lib/blog';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect, useState } from 'react';
import { generateAudioFromText } from '@/ai/flows/tts-flow';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug);

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  useEffect(() => {
    // Only generate audio for this specific post
    if (post && post.slug === 'o-futuro-da-ia-generativa') {
      const getAudio = async () => {
        setIsLoadingAudio(true);
        try {
          const result = await generateAudioFromText(post.content);
          if (result?.media) {
            setAudioSrc(result.media);
          }
        } catch (error) {
          console.error("Audio generation failed:", error);
          // Don't show the player if it fails
          setAudioSrc(null);
        } finally {
          setIsLoadingAudio(false);
        }
      };
      getAudio();
    }
  }, [post]);

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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl text-center"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h1>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-background/70">
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-background">{post.author}</p>
                <p className="text-sm text-background/80">{post.date}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <article className="my-16 rounded-xl border border-primary/20 bg-gradient-to-br from-slate-950 via-background to-slate-950 bg-[size:200%] p-8 shadow-2xl shadow-primary/10 animate-animated-gradient md:p-12">
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl
              prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-foreground prose-headings:text-center
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:font-normal">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (post.slug === 'o-futuro-da-ia-generativa' && paragraph.startsWith(introParagraphIdentifier)) {
                  if (isLoadingAudio) {
                    return (
                      <div key="audio-loader" className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 my-6">
                        <div className="space-y-2 flex-1">
                          <p className='text-sm text-center text-muted-foreground'>Gerando narração de áudio...</p>
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    );
                  }
                  if (audioSrc) {
                    return (
                      <div key="audio-player" className="my-6">
                        <p className="text-sm font-medium text-center mb-2 text-muted-foreground">Ouça este artigo:</p>
                        <audio controls className="w-full">
                          <source src={audioSrc} type="audio/wav" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                      </div>
                    );
                  }
                  // If audio fails or isn't available, render the original paragraph
                  return <p key={index}>{paragraph}</p>;
                }

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
    </main>
  );
}
