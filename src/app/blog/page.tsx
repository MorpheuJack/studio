import React from 'react';
import { getAllPosts } from '@/lib/blog';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSearch } from '@/components/blog/BlogSearch';

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const allPosts = getAllPosts();
  const searchTerm = searchParams?.q || '';

  const filteredPosts = allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

      <BlogSearch initialSearch={searchTerm} />

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Nenhum artigo encontrado com seus critérios de busca.</p>
        </div>
      )}
    </div>
  );
}
