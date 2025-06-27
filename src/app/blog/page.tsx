import React from 'react';
import { getAllPosts } from '@/lib/blog';
import { PostCard } from '@/components/blog/PostCard';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Aetheria AI Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notícias, tutoriais e insights sobre o futuro da Inteligência Artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
