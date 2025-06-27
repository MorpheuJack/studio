'use client';

import { getPostBySlug } from '@/lib/blog';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
            <h1 className="font-headline text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-4">
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

      <article className="bg-background px-4 py-16 sm:px-6 lg:px-8">
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
    </main>
  );
}
